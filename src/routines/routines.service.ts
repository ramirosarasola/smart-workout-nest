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
import {
  FindAllRoutineResponse,
  FindOneRoutineResponse,
} from './interfaces/routine.interface';

@Injectable()
export class RoutinesService {
  private readonly logger = new Logger('RoutineService');

  constructor(
    @InjectRepository(Routine)
    private readonly routineRepository: Repository<Routine>,
    @InjectRepository(RoutineImage)
    private readonly routineImageRepository: Repository<RoutineImage>,
  ) {}

  async create(createRoutineDto: CreateRoutineDto) {
    try {
      const { images = [], ...routineDetails } = createRoutineDto;

      // Esto solo crea una instancia de nuestra entity de manera sincronica
      const routine: Routine = this.routineRepository.create({
        ...routineDetails,
        images: images.map((img) =>
          this.routineImageRepository.create({ url: img }),
        ),
      });
      // Aca lo guardamos en la base de datos.
      await this.routineRepository.save(routine);
      return {
        ...routine,
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
      .leftJoinAndSelect('routine.images', 'images');

    // Definir los campos por los que se puede buscar
    const searchableFields = ['id', 'name', 'slug'];

    // Verificar si el término es un UUID para filtrar por 'id'
    if (isUUID(term)) {
      queryBuilder.where('routine.id = :id', { id: term });
    } else {
      // Generar condiciones dinámicas para otros campos
      const conditions = searchableFields
        .filter((field) => field !== 'id') // Evitar duplicar búsqueda por 'id'
        .map((field) => `LOWER(routine.${field}) = LOWER(:term)`)
        .join(' OR ');

      queryBuilder.where(conditions, { term: term.toLowerCase() });
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
  ): Promise<Routine> {
    const routine = await this.routineRepository.preload({
      id,
      ...updateRoutineDto,
      images: [],
    });

    if (!routine)
      throw new NotFoundException(`The routine with ID: "${id}" not found.`);

    try {
      await this.routineRepository.save(routine);
    } catch (error) {
      this.handleDBExceptions(error);
    }
    return routine;
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
    }
    throw new InternalServerErrorException(
      'Unexpected Error. Check Server Logs!',
    );
  }
}
