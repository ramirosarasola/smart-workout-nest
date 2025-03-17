import { Entity, ManyToOne, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Workout } from 'src/workouts/entities/workout.entity';
import { Exercise } from 'src/exercises/entities/exercise.entity';

@Entity()
export class WorkoutExercise {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Workout, (workout) => workout.workoutExercises, {
    onDelete: 'CASCADE',
  })
  workout: Workout;

  @ManyToOne(() => Exercise, { eager: true, onDelete: 'CASCADE' })
  exercise: Exercise;

  @Column({ default: 0 })
  setsCompleted: number;

  @Column({ default: 0 })
  repsCompleted: number;

  @Column({ type: 'decimal', precision: 5, scale: 2, default: 0 })
  weightUsed: number;
}
