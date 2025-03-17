import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { RoutineExercise } from './routine-exercise.entity';
import { RoutineImage } from './routine-image.entity';
import { User } from 'src/auth/entities/user.entity';

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
  @OneToMany(
    () => RoutineExercise,
    (routineExercise) => routineExercise.routine,
    {
      cascade: true,
      eager: true,
    },
  )
  routineExercises: RoutineExercise[];

  @OneToMany(() => RoutineImage, (routineImage) => routineImage.routine, {
    cascade: true,
    eager: true,
  })
  images: RoutineImage[];

  // Con el eager: true, se cargan los usuarios asociados a la rutina
  @ManyToOne(() => User, (user) => user.routines, { eager: true })
  user: User;

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
