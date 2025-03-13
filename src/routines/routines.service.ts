import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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
  ) {}

  async create(createRoutineDto: CreateRoutineDto) {
    try {
      const {
        images = [],
        exercises = [], // Ejercicios con detalles como sets, reps, restTime
        ...routineDetails
      } = createRoutineDto;

      // Creamos la rutina con los detalles proporcionados
      const routine: Routine = this.routineRepository.create({
        ...routineDetails,
        images: images.map((img) =>
          this.routineImageRepository.create({ url: img }),
        ),
        routineExercises: [], // Inicializamos vacío, los ejercicios se agregan después
      });

      // Guardamos la rutina en la base de datos
      const savedRoutine = await this.routineRepository.save(routine);

      // Procesamos los ejercicios para relacionarlos con la rutina
      const routineExercises = await Promise.all(
        exercises.map(async (exerciseData) => {
          // Buscamos el ejercicio por ID
          const exercise = await this.exerciseRepository.findOne({
            where: { id: exerciseData.exerciseId },
          });

          if (!exercise) {
            throw new Error(
              `Exercise with ID ${exerciseData.exerciseId} not found`,
            );
          }

          // Creamos la relación entre la rutina y el ejercicio
          return this.routineExerciseRepository.create({
            routine: savedRoutine, // Relacionamos la rutina guardada
            exercise: exercise, // Relacionamos el ejercicio completo
            sets: exerciseData.sets,
            reps: exerciseData.reps,
            restTime: exerciseData.restTime,
          });
        }),
      );

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
      .leftJoinAndSelect('routineExercises.exercise', 'exercise'); // Cargar ejercicios correctamente

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
      images = [],
      exercises = [], // Aquí estamos recibiendo los ejercicios con los detalles de sets, reps, restTime
      ...routineDetails
    } = updateRoutineDto;

    // Primero, intentamos cargar la rutina con el ID
    const routine = await this.routineRepository.preload({
      id,
      ...routineDetails,
      images: [], // Inicializamos las imágenes aquí (las gestionamos por separado)
    });

    if (!routine)
      throw new NotFoundException(`The routine with ID: "${id}" not found.`);

    try {
      // Actualizamos las imágenes asociadas a la rutina (si es necesario)
      routine.images = images.map((img) =>
        this.routineImageRepository.create({ url: img }),
      );

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
      await this.routineRepository.save(routine);

      return routine;
    } catch (error) {
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

    console.log(routine);

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
    }
    throw new InternalServerErrorException(
      'Unexpected Error. Check Server Logs!',
    );
  }
}
