import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

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
