import { ExerciseMuscle } from 'src/exercise-muscle/entities/exercise-muscle.entity';
import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class Exercise {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  name: string;

  @Column('text')
  description: string;

  @Column('text')
  difficultyLevel: string;

  @Column('float')
  relativeLoad: number;

  @Column('smallint')
  stabilityRequirement: number;

  @Column('smallint')
  rangeOfMotion: number;

  @Column('smallint')
  technicalDemand: number;

  @OneToMany(
    () => ExerciseMuscle,
    (exerciseMuscle) => exerciseMuscle.exercise,
    {
      cascade: true,
    },
  )
  muscleActivations: ExerciseMuscle[];
}
