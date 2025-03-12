import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Routine {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'float',
    default: 0.0,
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
  name: string;

  @Column('text')
  description: string;

  @Column('text')
  level: string;

  @Column({
    type: 'text',
    unique: true,
  })
  slug: string;

  // To refactor
  muscles: string[];
}
