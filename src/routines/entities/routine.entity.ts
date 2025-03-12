import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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

  // To refactor
  muscles: string[];

  @BeforeInsert()
  validateSlugInser() {
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
}
