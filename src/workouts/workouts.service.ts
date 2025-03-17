import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/entities/user.entity';
import { RoutineExercise } from 'src/routines/entities/routine-exercise.entity';
import { Repository } from 'typeorm';
import { UpdateWorkoutDto } from './dto/update-workout.dto';
import { WorkoutExercise } from './entities/workout-exercise.entity';
import { Workout } from './entities/workout.entity';

@Injectable()
export class WorkoutsService {
  private readonly logger = new Logger('WorkoutsService');
  constructor(
    @InjectRepository(Workout)
    private readonly workoutsRepository: Repository<Workout>,
    @InjectRepository(WorkoutExercise)
    private readonly workoutsExerciseRepository: Repository<WorkoutExercise>,
    @InjectRepository(RoutineExercise)
    private readonly routineExerciseRepository: Repository<RoutineExercise>,
  ) {}
  create(user: User) {
    const workoutToCreate = this.workoutsRepository.create({
      user,
      date: new Date(),
    });
    return this.workoutsRepository.save(workoutToCreate);
  }

  async saveWorkout(
    user: User,
    saveWorkoutDto: UpdateWorkoutDto,
  ): Promise<Workout> {
    // Buscar el workout asociado al usuario
    const workout = await this.workoutsRepository.findOne({
      where: { user, id: saveWorkoutDto.id },
    });

    if (!workout) {
      throw new NotFoundException(`Workout not found for user ${user.id}`);
    }

    // Obtener todos los routineExercises en una sola consulta
    const routineExerciseIds = saveWorkoutDto.exercises.map(
      (ex) => ex.routineExerciseId,
    );
    const routineExercises =
      await this.routineExerciseRepository.findByIds(routineExerciseIds);

    // Mapear los ejercicios a un diccionario para acceso rápido
    const routineExerciseMap = new Map(
      routineExercises.map((ex) => [ex.id, ex]),
    );

    // Crear los nuevos ejercicios
    const workoutExercises = saveWorkoutDto.exercises.map((exercise) => {
      const routineExercise = routineExerciseMap.get(
        exercise.routineExerciseId,
      );
      if (!routineExercise) {
        throw new NotFoundException(
          `Routine exercise not found: ${exercise.routineExerciseId}`,
        );
      }

      return this.workoutsExerciseRepository.create({
        workout: workout.id,
        routineExercise,
        setsCompleted: exercise.setsCompleted,
        repsCompleted: exercise.repsCompleted,
        weightUsed: exercise.weightUsed,
        restTime: exercise.restTime,
      });
    });

    // Guardar todos los ejercicios en la base de datos en una sola operación
    const savedWorkoutExercises =
      await this.workoutsExerciseRepository.save(workoutExercises);

    // Asociar los ejercicios al workout
    workout.workoutExercises = savedWorkoutExercises;

    // Guardar y retornar el workout actualizado
    return this.workoutsRepository.save(workout);
  }

  async findAllActiveByUserId(userId: string) {
    this.logger.log(userId);
    const workouts = await this.workoutsRepository.find({
      where: {
        user: {
          id: userId,
        },
      },
    });

    if (!workouts || workouts.length === 0) {
      throw new NotFoundException(`Workouts not found for the user ${userId}`);
    }
    return workouts;
  }

  findOne(id: number) {
    return `This action returns a #${id} workout`;
  }

  async findOneActiveByUserId(user: User, workoutId: string) {
    const workout = await this.workoutsRepository.findOne({
      where: {
        user: {
          id: user.id,
        },
        id: workoutId,
      },
    });

    this.logger.log(workout);
    return workout;
  }

  update(id: number, updateWorkoutDto: UpdateWorkoutDto) {
    console.log(updateWorkoutDto);
    return `This action updates a #${id} workout`;
  }

  remove(id: number) {
    return `This action removes a #${id} workout`;
  }
}
