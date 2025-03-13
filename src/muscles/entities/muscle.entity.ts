import { ExerciseMuscle } from 'src/exercise-muscle/entities/exercise-muscle.entity';
import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class Muscle {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', { unique: true })
  name: string; // Ejemplo: "Chest", "Triceps", "Shoulders"

  @OneToMany(() => ExerciseMuscle, (exerciseMuscle) => exerciseMuscle.muscle)
  exerciseActivations: ExerciseMuscle[];
}
