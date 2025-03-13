import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { RoutineImage } from './routine-image.entity';

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
    type: 'smallint',
    default: 0,
  })
  estimatedMins: number;

  @Column('text')
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

  @Column({
    type: 'text',
    array: true,
    default: [],
  })
  types: string[];

  // Relations
  @OneToMany(() => RoutineImage, (routineImage) => routineImage.routine, {
    cascade: true,
  })
  images?: RoutineImage[];

  @BeforeInsert()
  validateSlugInsert() {
    if (!this.slug) {
      this.slug = this.name
        .toLowerCase()
        .replaceAll(' ', '-')
        .replaceAll('"', '')
        .replaceAll("'", '');
    } else {
      this.slug = this.slug.toLowerCase();
    }
  }

  @BeforeUpdate()
  validateSlugUpdate() {
    if (this.slug) {
      this.slug = this.slug
        .toLowerCase()
        .replaceAll(' ', '-')
        .replaceAll('"', '')
        .replaceAll("'", '');
    }
  }
}
