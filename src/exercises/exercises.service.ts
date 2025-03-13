import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ExerciseMuscle } from 'src/exercise-muscle/entities/exercise-muscle.entity';
import { Muscle } from 'src/muscles/entities/muscle.entity';
import { Repository } from 'typeorm';
import { CreateExerciseDto } from './dto/create-exercise.dto';
import { UpdateExerciseDto } from './dto/update-exercise.dto';
import { Exercise } from './entities/exercise.entity';

@Injectable()
export class ExercisesService {
  private readonly logger: Logger = new Logger('ExerciseService');

  constructor(
    @InjectRepository(Exercise)
    private readonly exerciseRepository: Repository<Exercise>,
    @InjectRepository(Muscle)
    private readonly muscleRepository: Repository<Muscle>,
    @InjectRepository(ExerciseMuscle)
    private readonly exerciseMuscleRepository: Repository<ExerciseMuscle>,
  ) {}

  async create(
    createExerciseDto: CreateExerciseDto,
  ): Promise<Exercise | undefined> {
    try {
      // Buscar los músculos en la base de datos
      const muscles = await this.muscleRepository.find({
        where: createExerciseDto.muscleActivations.map((m) => ({
          name: m.muscleName,
        })),
      });

      if (muscles.length !== createExerciseDto.muscleActivations.length) {
        throw new NotFoundException(`Some muscles does not exists on DB`);
      }

      // Crear el ejercicio
      const newExercise = this.exerciseRepository.create({
        name: createExerciseDto.name,
        description: createExerciseDto.description,
        difficultyLevel: createExerciseDto.difficultyLevel,
        relativeLoad: createExerciseDto.relativeLoad,
        stabilityRequirement: createExerciseDto.stabilityRequirement,
        rangeOfMotion: createExerciseDto.rangeOfMotion,
        technicalDemand: createExerciseDto.technicalDemand,
      });

      // Guardar el ejercicio en la base de datos
      const savedExercise = await this.exerciseRepository.save(newExercise);

      // Crear las relaciones ExerciseMuscle
      const exerciseMuscles = createExerciseDto.muscleActivations.map((m) => {
        const muscle = muscles.find((muscle) => muscle.name === m.muscleName);
        return this.exerciseMuscleRepository.create({
          exercise: savedExercise,
          muscle,
          activationLevel: m.activationLevel,
        });
      });

      // Guardar las relaciones en la base de datos
      await this.exerciseMuscleRepository.save(exerciseMuscles);

      return savedExercise;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findAll(): Promise<Exercise[]> {
    return await this.exerciseRepository.find();
  }

  async findOne(id: string): Promise<Exercise> {
    const exercise: Exercise | null = await this.exerciseRepository.findOneBy({
      id,
    });

    if (!exercise)
      throw new NotFoundException(`The exercise with ID: '${id}' not found.`);

    return exercise;
  }

  update(id: string, updateExerciseDto: UpdateExerciseDto) {
    console.log(updateExerciseDto);
    return `This action updates a #${id} exercise`;
  }

  remove(id: string) {
    return `This action removes a #${id} exercise`;
  }

  private handleDBExceptions(error: any) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if (error.code === '23505') {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      this.logger.error(error.detail);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      throw new BadRequestException(error.detail);
    }
    throw new InternalServerErrorException(
      'Unexpected Error. Check Server Logs!',
    );
  }

  async deleteAllRoutines() {
    const query = this.exerciseRepository.createQueryBuilder('exercise');

    try {
      return await query.delete().where({}).execute();
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }
}
