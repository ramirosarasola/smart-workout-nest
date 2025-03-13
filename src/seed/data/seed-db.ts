import { Category } from 'src/categories/entities/category.entity';
import { Exercise } from 'src/exercises/entities/exercise.entity';
import { v4 as uuid } from 'uuid';

export const CATEGORIES_SEED: Category[] = [
  {
    id: uuid(),
    name: 'Calistenia - Fuerza',
    description:
      'Ejercicios de peso corporal enfocados en desarrollar fuerza y resistencia.',
    createdAt: Date.now(),
  },
  {
    id: uuid(),
    name: 'Calistenia - Equilibrio y Control',
    description:
      'Ejercicios que mejoran el control corporal y el equilibrio, como handstands y planchas.',
    createdAt: Date.now(),
  },
  {
    id: uuid(),
    name: 'Calistenia - Explosividad',
    description: 'Ejercicios dinámicos como muscle-ups y saltos explosivos.',
    createdAt: Date.now(),
  },
  {
    id: uuid(),
    name: 'Gimnasio - Fuerza Máxima',
    description:
      'Ejercicios con pesos pesados para el desarrollo de la fuerza pura.',
    createdAt: Date.now(),
  },
  {
    id: uuid(),
    name: 'Gimnasio - Hipertrofia',
    description:
      'Entrenamiento enfocado en el crecimiento muscular con repeticiones moderadas.',
    createdAt: Date.now(),
  },
  {
    id: uuid(),
    name: 'Gimnasio - Resistencia Muscular',
    description:
      'Ejercicios con peso ligero y altas repeticiones para mejorar la resistencia.',
    createdAt: Date.now(),
  },
  {
    id: uuid(),
    name: 'Cardio - Alta Intensidad',
    description:
      'Ejercicios de alta intensidad como HIIT para mejorar la capacidad cardiovascular.',
    createdAt: Date.now(),
  },
  {
    id: uuid(),
    name: 'Cardio - Resistencia',
    description:
      'Ejercicios de larga duración como correr, nadar o andar en bicicleta.',
    createdAt: Date.now(),
  },
  {
    id: uuid(),
    name: 'Movilidad y Flexibilidad',
    description:
      'Ejercicios para mejorar la movilidad articular y prevenir lesiones.',
    createdAt: Date.now(),
  },
  {
    id: uuid(),
    name: 'Rehabilitación y Recuperación',
    description:
      'Ejercicios diseñados para la recuperación muscular y prevención de lesiones.',
    createdAt: Date.now(),
  },
];

export const EXERCISES_SEED: Exercise[] = [];
