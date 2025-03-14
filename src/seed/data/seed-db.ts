import { Category } from 'src/categories/entities/category.entity';
import { CreateExerciseDto } from 'src/exercises/dto/create-exercise.dto';
import { CreateMuscleDto } from 'src/muscles/dto/create-muscle.dto';
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

export const EXERCISES_SEED: CreateExerciseDto[] = [
  {
    name: 'Pull-Up',
    description:
      'A bodyweight exercise that primarily targets the upper back and biceps.',
    difficultyLevel: 'Intermediate',
    relativeLoad: 1.0,
    stabilityRequirement: 6,
    rangeOfMotion: 8,
    technicalDemand: 7,
    muscleActivations: [
      {
        muscleName: 'Latissimus Dorsi',
        activationLevel: 9,
      },
      {
        muscleName: 'Biceps Brachii',
        activationLevel: 7,
      },
      {
        muscleName: 'Forearms',
        activationLevel: 6,
      },
    ],
    images: [
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    ],
  },
  {
    name: 'Squat',
    description:
      'A fundamental lower body exercise that targets the quadriceps, glutes, and hamstrings.',
    difficultyLevel: 'Beginner',
    relativeLoad: 0.4,
    stabilityRequirement: 7,
    rangeOfMotion: 9,
    technicalDemand: 6,
    muscleActivations: [
      {
        muscleName: 'Quadriceps',
        activationLevel: 9,
      },
      {
        muscleName: 'Glutes',
        activationLevel: 8,
      },
      {
        muscleName: 'Hamstrings',
        activationLevel: 7,
      },
    ],
    images: [
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    ],
  },
  {
    name: 'Bench Press',
    description:
      'A classic strength exercise that primarily targets the chest, shoulders, and triceps.',
    difficultyLevel: 'Intermediate',
    relativeLoad: 0.6,
    stabilityRequirement: 3,
    rangeOfMotion: 7,
    technicalDemand: 6,
    muscleActivations: [
      {
        muscleName: 'Pectorals',
        activationLevel: 9,
      },
      {
        muscleName: 'Triceps',
        activationLevel: 7,
      },
      {
        muscleName: 'Deltoids',
        activationLevel: 6,
      },
    ],
    images: [
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    ],
  },
  {
    name: 'Dips',
    description:
      'A bodyweight exercise that heavily engages the triceps, chest, and shoulders.',
    difficultyLevel: 'Advanced',
    relativeLoad: 1.0,
    stabilityRequirement: 5,
    rangeOfMotion: 8,
    technicalDemand: 8,
    muscleActivations: [
      {
        muscleName: 'Triceps',
        activationLevel: 9,
      },
      {
        muscleName: 'Pectorals',
        activationLevel: 8,
      },
      {
        muscleName: 'Shoulders',
        activationLevel: 7,
      },
    ],
    images: [
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    ],
  },
  {
    name: 'Lunges',
    description:
      'A lower body exercise that enhances balance and targets multiple muscles.',
    difficultyLevel: 'Beginner',
    relativeLoad: 0.3,
    stabilityRequirement: 8,
    rangeOfMotion: 9,
    technicalDemand: 5,
    muscleActivations: [
      {
        muscleName: 'Quadriceps',
        activationLevel: 8,
      },
      {
        muscleName: 'Glutes',
        activationLevel: 8,
      },
      {
        muscleName: 'Hamstrings',
        activationLevel: 7,
      },
    ],
    images: [
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    ],
  },
  {
    name: 'Overhead Press',
    description:
      'A shoulder exercise that also engages the triceps and upper chest.',
    difficultyLevel: 'Intermediate',
    relativeLoad: 0.5,
    stabilityRequirement: 4,
    rangeOfMotion: 7,
    technicalDemand: 7,
    muscleActivations: [
      {
        muscleName: 'Deltoids',
        activationLevel: 9,
      },
      {
        muscleName: 'Triceps',
        activationLevel: 7,
      },
      {
        muscleName: 'Upper Chest',
        activationLevel: 6,
      },
    ],
    images: [
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    ],
  },
  {
    name: 'Plank',
    description:
      'An isometric core exercise that builds endurance and stability.',
    difficultyLevel: 'Beginner',
    relativeLoad: 0.0,
    stabilityRequirement: 10,
    rangeOfMotion: 1,
    technicalDemand: 5,
    muscleActivations: [
      {
        muscleName: 'Core',
        activationLevel: 9,
      },
      {
        muscleName: 'Shoulders',
        activationLevel: 6,
      },
      {
        muscleName: 'Glutes',
        activationLevel: 5,
      },
    ],
    images: [
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    ],
  },
];

export const MUSCLES_SEED: CreateMuscleDto[] = [
  { name: 'Quadriceps' },
  { name: 'Glutes' },
  { name: 'Hamstrings' },
  { name: 'Pectorals' },
  { name: 'Triceps' },
  { name: 'Deltoids' },
  { name: 'Shoulders' },
  { name: 'Upper Chest' },
  { name: 'Core' },
  { name: 'Latissimus Dorsi' },
  { name: 'Biceps Brachii' },
  { name: 'Forearms' },
];
