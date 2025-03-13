import { Test, TestingModule } from '@nestjs/testing';
import { ExerciseMuscleController } from './exercise-muscle.controller';
import { ExerciseMuscleService } from './exercise-muscle.service';

describe('ExerciseMuscleController', () => {
  let controller: ExerciseMuscleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExerciseMuscleController],
      providers: [ExerciseMuscleService],
    }).compile();

    controller = module.get<ExerciseMuscleController>(ExerciseMuscleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
