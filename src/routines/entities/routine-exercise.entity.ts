import { Exercise } from 'src/exercises/entities/exercise.entity';
import { Routine } from 'src/routines/entities/routine.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class RoutineExercise {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Routine, (routine) => routine.routineExercises, {
    onDelete: 'CASCADE',
  })
  routine: Routine;

  @ManyToOne(() => Exercise, (exercise) => exercise.routineExercises, {
    eager: true,
    onDelete: 'CASCADE',
  })
  exercise: Exercise;

  @Column()
  sets: number;

  @Column()
  reps: number;

  @Column()
  restTime: number;
}
