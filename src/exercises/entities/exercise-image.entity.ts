import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Exercise } from './exercise.entity';

@Entity()
export class ExerciseImage {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Exercise, (exercise) => exercise.images, {
    onDelete: 'CASCADE',
  })
  exercise: number;

  @Column('text')
  url: string;
}
