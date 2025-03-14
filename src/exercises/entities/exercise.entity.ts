import { ExerciseMuscle } from 'src/exercise-muscle/entities/exercise-muscle.entity';
import { RoutineExercise } from 'src/routines/entities/routine-exercise.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ExerciseImage } from './exercise-image.entity';

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

  @OneToMany(() => ExerciseImage, (exerciseImage) => exerciseImage.exercise, {
    cascade: true,
  })
  images: ExerciseImage[];

  @OneToMany(
    () => ExerciseMuscle,
    (exerciseMuscle) => exerciseMuscle.exercise,
    {
      cascade: true,
    },
  )
  muscleActivations: ExerciseMuscle[];

  @OneToMany(
    () => RoutineExercise,
    (routineExercise) => routineExercise.exercise,
  )
  routineExercises: RoutineExercise[];
}
