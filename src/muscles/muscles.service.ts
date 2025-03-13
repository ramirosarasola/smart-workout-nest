import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateMuscleDto } from './dto/create-muscle.dto';
import { UpdateMuscleDto } from './dto/update-muscle.dto';
import { Repository } from 'typeorm';
import { Muscle } from './entities/muscle.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class MusclesService {
  constructor(
    @InjectRepository(Muscle)
    private readonly muscleRepository: Repository<Muscle>,
  ) {}

  async create(createMuscleDto: CreateMuscleDto): Promise<Muscle | undefined> {
    try {
      return await this.muscleRepository.save(createMuscleDto);
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async findAll(): Promise<Muscle[]> {
    return await this.muscleRepository.find();
  }

  async findOne(id: string): Promise<Muscle> {
    const muscle: Muscle | null = await this.muscleRepository.findOneBy({ id });

    if (!muscle)
      throw new NotFoundException(`The muscle with ID: '${id}' not found`);

    return muscle;
  }

  update(id: string, updateMuscleDto: UpdateMuscleDto) {
    console.log(updateMuscleDto);
    return `This action updates a #${id} muscle`;
  }

  remove(id: string) {
    return `This action removes a #${id} muscle`;
  }

  private handleDBExceptions(error: any) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if (error.code === '23505') {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      throw new BadRequestException(error.detail);
    }
    throw new InternalServerErrorException(
      'Unexpected Error. Check Server Logs!',
    );
  }
}
