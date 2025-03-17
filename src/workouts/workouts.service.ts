import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/entities/user.entity';
import { Repository } from 'typeorm';
import { UpdateWorkoutDto } from './dto/update-workout.dto';
import { Workout } from './entities/workout.entity';

@Injectable()
export class WorkoutsService {
  private readonly logger = new Logger('WorkoutsService');
  constructor(
    @InjectRepository(Workout)
    private readonly workoutsRepository: Repository<Workout>,
  ) {}
  create(user: User) {
    const workoutToCreate = this.workoutsRepository.create({
      user,
      date: new Date(),
    });
    return this.workoutsRepository.save(workoutToCreate);
  }

  async saveWorkout(user: User, saveWorkoutDto: UpdateWorkoutDto) {
    const workout = await this.workoutsRepository.findOneBy({
      user,
      id: saveWorkoutDto.id,
    });

    this.logger.log(workout);
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
