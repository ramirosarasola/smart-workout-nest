import { Category } from 'src/categories/entities/category.entity';
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
    name: 'Gimnasio - Equilibrio y Control',
    description:
      'Ejercicios que mejoran el control corporal y el equilibrio, como handstands y planchas.',
    createdAt: Date.now(),
  },
  {
    id: uuid(),
    name: 'Gimnasio - Explosividad',
    description: 'Ejercicios dinámicos como muscle-ups y saltos explosivos.',
    createdAt: Date.now(),
  },
];
