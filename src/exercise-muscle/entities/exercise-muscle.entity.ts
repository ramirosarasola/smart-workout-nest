import { Exercise } from 'src/exercises/entities/exercise.entity';
import { Muscle } from 'src/muscles/entities/muscle.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ExerciseMuscle {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Exercise, (exercise) => exercise.muscleActivations, {
    onDelete: 'CASCADE',
  })
  exercise: Exercise;

  @ManyToOne(() => Muscle, (muscle) => muscle.exerciseActivations, {
    onDelete: 'CASCADE',
  })
  muscle: Muscle;

  @Column('smallint')
  activationLevel: number; // Nivel de activación del músculo en este ejercicio
}
