import { User } from 'src/auth/entities/user.entity';
import { Routine } from 'src/routines/entities/routine.entity';
import {
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Column,
} from 'typeorm';
import { WorkoutExercise } from './workout-exercise.entity';

@Entity()
export class Workout {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.workouts, { eager: true })
  user: User;

  @ManyToOne(() => Routine, (routine) => routine.workouts, { eager: true })
  @JoinColumn()
  routine: Routine;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  date: Date;

  @OneToMany(
    () => WorkoutExercise,
    (workoutExercise) => workoutExercise.workout,
    {
      cascade: true,
      eager: true,
    },
  )
  workoutExercises: WorkoutExercise[];
}
