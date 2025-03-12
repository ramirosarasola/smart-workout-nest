import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRoutineDto } from './dto/create-routine.dto';
import { UpdateRoutineDto } from './dto/update-routine.dto';
import { Routine } from './entities/routine.entity';

@Injectable()
export class RoutinesService {
  private readonly logger = new Logger('RoutineService');

  constructor(
    @InjectRepository(Routine)
    private readonly routineRepository: Repository<Routine>,
  ) {}

  async create(createRoutineDto: CreateRoutineDto) {
    try {
      // Esto solo crea una instancia de nuestra entity de manera sincronica
      const routine = this.routineRepository.create(createRoutineDto);
      // Aca lo guardamos en la base de datos.
      await this.routineRepository.save(routine);
      return routine;
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  findAll(): Promise<Routine[]> {
    return this.routineRepository.find();
  }

  async findOne(id: string): Promise<Routine> {
    const routine = await this.routineRepository.findOneBy({ id });

    if (!routine)
      throw new NotFoundException(`Routine with ID: ${id} not found.`);

    return routine;
  }

  update(id: string, updateRoutineDto: UpdateRoutineDto) {
    console.log(updateRoutineDto);
    return `This action updates a #${id} routine`;
  }

  async delete(id: string): Promise<void> {
    await this.findOne(id);
    // analyze to use the remove method by passing the Routine.
    await this.routineRepository.delete(id);
  }

  private handleDBExceptions(error: any) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if (error.code === '23505') {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      this.logger.error(error.detail);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      throw new BadRequestException(error.detail);
    }
    this.logger.error(error);
    throw new InternalServerErrorException(
      'Unexpected Error. Check Server Logs!',
    );
  }
}
