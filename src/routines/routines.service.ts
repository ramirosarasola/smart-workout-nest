import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, In, Repository } from 'typeorm';
import { validate as isUUID } from 'uuid';
import { PaginationDto } from '../common/dtos/pagination.dto';
import { CreateRoutineDto } from './dto/create-routine.dto';
import { UpdateRoutineDto } from './dto/update-routine.dto';
import { Routine, RoutineImage } from './entities';
import { RoutineExercise } from './entities/routine-exercise.entity';
import {
  FindAllRoutineResponse,
  FindOneRoutineResponse,
} from './interfaces/routine.interface';
import { Exercise } from 'src/exercises/entities/exercise.entity';

@Injectable()
export class RoutinesService {
  private readonly logger = new Logger('RoutineService');

  constructor(
    @InjectRepository(Routine)
    private readonly routineRepository: Repository<Routine>,
    @InjectRepository(RoutineImage)
    private readonly routineImageRepository: Repository<RoutineImage>,
    @InjectRepository(RoutineExercise)
    private readonly routineExerciseRepository: Repository<RoutineExercise>,
    @InjectRepository(Exercise)
    private readonly exerciseRepository: Repository<Exercise>,
    private readonly dataSource: DataSource,
  ) {}

  async create(createRoutineDto: CreateRoutineDto) {
    try {
      const {
        images = [],
        exercises = [], // Ejercicios con detalles como sets, reps, restTime
        ...routineDetails
      } = createRoutineDto;

      // Validamos que todos los ejercicios existen antes de guardar la rutina
      const exerciseIds = exercises.map((e) => e.exerciseId);
      const foundExercises = await this.exerciseRepository.find({
        where: { id: In(exerciseIds) }, // Buscar todos los ejercicios con los IDs dados
      });

      if (foundExercises.length !== exerciseIds.length) {
        const missingIds = exerciseIds.filter(
          (id) => !foundExercises.some((ex) => ex.id === id),
        );
        throw new Error(
          `Exercises with IDs ${missingIds.join(', ')} not found`,
        );
      }

      // Creamos la rutina con los detalles proporcionados
      const routine: Routine = this.routineRepository.create({
        ...routineDetails,
        images: images.map((img) =>
          this.routineImageRepository.create({ url: img }),
        ),
      });

      // Guardamos la rutina en la base de datos
      const savedRoutine = await this.routineRepository.save(routine);

      // Creamos la relación entre la rutina y los ejercicios
      const routineExercises = exercises.map((exerciseData) => {
        const exercise = foundExercises.find(
          (ex) => ex.id === exerciseData.exerciseId,
        );
        return this.routineExerciseRepository.create({
          routine: savedRoutine,
          exercise: exercise,
          sets: exerciseData.sets,
          reps: exerciseData.reps,
          restTime: exerciseData.restTime,
        });
      });

      // Guardamos las relaciones entre la rutina y los ejercicios
      const savedRoutineExercises =
        await this.routineExerciseRepository.save(routineExercises);

      // Retornamos la rutina con las imágenes y los ejercicios
      return {
        ...savedRoutine,
        routineExercises: savedRoutineExercises.map((rs) => ({
          exercise: {
            ...rs.exercise,
            sets: rs.sets,
            reps: rs.reps,
            rest: rs.restTime,
          },
        })),
        images,
      };
    } catch (error) {
      this.logger.error(error);
      this.handleDBExceptions(error);
    }
  }

  async findAll(
    paginationDto: PaginationDto,
  ): Promise<FindAllRoutineResponse[]> {
    const { limit = 10, offset = 0 } = paginationDto;
    const routines = await this.routineRepository.find({
      take: limit,
      skip: offset,
      relations: {
        images: true,
      },
    });

    return routines.map((routine) => ({
      ...routine,
      images: routine.images?.map((img) => img.url) || [],
    }));
  }

  async findOne(term: string): Promise<Routine> {
    const queryBuilder = this.routineRepository
      .createQueryBuilder('routine')
      .leftJoinAndSelect('routine.images', 'images') // Cargar imágenes
      .leftJoinAndSelect('routine.routineExercises', 'routineExercises') // Relación intermedia
      .leftJoinAndSelect('routineExercises.exercise', 'exercise') // Cargar ejercicios correctamente
      .leftJoinAndSelect('exercise.images', 'exerciseImages'); // agregar las images de los exercicios

    if (isUUID(term)) {
      queryBuilder.where('routine.id = :id', { id: term });
    } else {
      queryBuilder.where(
        'LOWER(routine.name) = LOWER(:term) OR LOWER(routine.slug) = LOWER(:term)',
        { term: term.toLowerCase() },
      );
    }

    const routine = await queryBuilder.getOne();

    if (!routine) {
      throw new NotFoundException(`The routine was not found.`);
    }

    return routine;
  }

  async update(
    id: string,
    updateRoutineDto: UpdateRoutineDto,
  ): Promise<Routine | undefined> {
    const {
      images,
      exercises = [], // Aquí estamos recibiendo los ejercicios con los detalles de sets, reps, restTime
      ...routineDetails
    } = updateRoutineDto;

    // Primero, intentamos cargar la rutina con el ID
    const routine = await this.routineRepository.preload({
      id,
      ...routineDetails,
    });

    if (!routine)
      throw new NotFoundException(`The routine with ID: "${id}" not found.`);

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // Actualizamos las imágenes asociadas a la rutina (si es necesario)

      if (images) {
        await queryRunner.manager.delete(RoutineImage, { routine: { id } });

        routine.images = images.map((img) =>
          this.routineImageRepository.create({ url: img }),
        );
      } else {
        const { images } = await this.findOne(id);
        routine.images = images;
      }

      // Primero, eliminamos las relaciones existentes de ejercicios
      await this.routineExerciseRepository.delete({ routine: { id } });

      // Ahora procesamos los nuevos ejercicios con su respectiva información
      const routineExercises = exercises.map((exerciseData) => {
        return this.routineExerciseRepository.create({
          routine, // Asociamos la rutina que estamos actualizando
          exercise: { id: exerciseData.exerciseId }, // Solo el ID del ejercicio
          sets: exerciseData.sets,
          reps: exerciseData.reps,
          restTime: exerciseData.restTime,
        });
      });

      // Guardamos las relaciones actualizadas entre los ejercicios y la rutina
      await this.routineExerciseRepository.save(routineExercises);

      // Finalmente, guardamos la rutina con sus nuevas relaciones
      await queryRunner.manager.save(routine);

      await queryRunner.commitTransaction();
      await queryRunner.release();
      return routine;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      await queryRunner.release();
      this.handleDBExceptions(error);
    }
  }

  async delete(id: string): Promise<void> {
    await this.findOne(id);
    // analyze to use the remove method by passing the Routine.
    await this.routineRepository.delete(id);
  }

  async findOnePlain(term: string): Promise<FindOneRoutineResponse> {
    const routine = await this.findOne(term);

    return {
      ...routine,
      images: routine.images?.map((img) => img.url) || [],
    };
  }

  private handleDBExceptions(error: any) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if (error.code === '23505') {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      this.logger.error(error.detail);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      throw new BadRequestException(error.detail);
    } else {
      throw new InternalServerErrorException(
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        error.message || 'Unexpected Error. Check Server Logs!',
      );
    }
  }

  async deleteAllRoutines() {
    const query = this.routineRepository.createQueryBuilder('routine');
    try {
      return await query.delete().where({}).execute();
    } catch (error) {
      this.logger.error(error);
      this.handleDBExceptions(error);
    }
  }
}
