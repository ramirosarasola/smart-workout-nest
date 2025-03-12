import { Exercise } from 'src/exercises/interfaces/exercise.interface';
import { v4 as uuid } from 'uuid';

export const EXERCISES_SEED: Exercise[] = [
  {
    id: uuid(),
    name: 'Sentadilla',
    level: 'Intermedio',
    muscles: ['Pierna', 'Triceps'],
  },
  {
    id: uuid(),
    name: 'Pike Push Ups',
    level: 'Begginer',
    muscles: ['chest', 'shoulder', 'triceps'],
  },
  {
    id: uuid(),
    name: 'Pull Ups',
    level: 'Begginer',
    muscles: ['back'],
  },
  {
    id: uuid(),
    name: 'Push Ups',
    level: 'Begginer',
    muscles: ['chest', 'triceps'],
  },
  {
    id: uuid(),
    name: 'Pike Push Ups',
    level: 'Begginer',
    muscles: ['chest', 'shoulder', 'triceps'],
  },
  {
    id: uuid(),
    name: 'Pull Ups',
    level: 'Begginer',
    muscles: ['back'],
  },
  {
    id: uuid(),
    name: 'Push Ups',
    level: 'Begginer',
    muscles: ['chest', 'triceps'],
  },
];
