import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Routine } from './routine.entity';

@Entity()
export class RoutineImage {
  @PrimaryGeneratedColumn() // Genera un number unico auto incremental
  id: number;

  @Column('text')
  url: string;

  @ManyToOne(() => Routine, (routine) => routine.images, {
    onDelete: 'CASCADE',
  })
  routine: Routine;
}
