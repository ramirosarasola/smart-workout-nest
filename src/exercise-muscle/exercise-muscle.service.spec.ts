import { Test, TestingModule } from '@nestjs/testing';
import { ExerciseMuscleService } from './exercise-muscle.service';

describe('ExerciseMuscleService', () => {
  let service: ExerciseMuscleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExerciseMuscleService],
    }).compile();

    service = module.get<ExerciseMuscleService>(ExerciseMuscleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
