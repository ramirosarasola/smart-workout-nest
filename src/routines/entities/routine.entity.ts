import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Routine {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  level: string;

  @Column({
    type: 'decimal',
    default: 0,
  })
  intensity: number;

  @Column({
    type: 'numeric',
    default: 0,
  })
  estimatedMins: number;

  @Column('text', {
    unique: true,
  })
  title: string;

  @Column('text')
  description: string;

  @Column({
    type: 'text',
    unique: true,
  })
  slug: string;
}
