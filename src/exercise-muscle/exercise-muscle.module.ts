import { Module } from '@nestjs/common';
import { ExerciseMuscleService } from './exercise-muscle.service';
import { ExerciseMuscleController } from './exercise-muscle.controller';
import { ExerciseMuscle } from './entities/exercise-muscle.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [ExerciseMuscleController],
  providers: [ExerciseMuscleService],
  imports: [TypeOrmModule.forFeature([ExerciseMuscle])],
})
export class ExerciseMuscleModule {}
