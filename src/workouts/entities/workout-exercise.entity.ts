import { Entity, ManyToOne, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Workout } from 'src/workouts/entities/workout.entity';
import { RoutineExercise } from 'src/routines/entities/routine-exercise.entity';
@Entity()
export class WorkoutExercise {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Workout, (workout) => workout.workoutExercises, {
    onDelete: 'CASCADE',
  })
  workout: Workout;

  @ManyToOne(() => RoutineExercise, { eager: true, onDelete: 'CASCADE' })
  routineExercise: RoutineExercise;

  @Column({ default: 0 })
  setsCompleted: number;

  @Column({ default: 0 })
  repsCompleted: number;

  @Column({ type: 'decimal', precision: 5, scale: 2, default: 0 })
  weightUsed: number;
}
