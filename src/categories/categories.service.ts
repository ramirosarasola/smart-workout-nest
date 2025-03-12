import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';
import { v4 as uuid } from 'uuid';

@Injectable()
export class CategoriesService {
  private categories: Category[] = [
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

  create(createCategoryDto: CreateCategoryDto) {
    const newCategory: Category = {
      id: uuid(),
      ...createCategoryDto,
      createdAt: Date.now(),
    };
    this.categories.push(newCategory);
    return newCategory;
  }

  findAll() {
    return this.categories;
  }

  findOne(id: string) {
    const category = this.categories.find((category) => category.id === id);
    if (!category) {
      throw new NotFoundException('Category not found');
    }
    return category;
  }

  update(id: string, updateCategoryDto: UpdateCategoryDto) {
    let categoryDB = this.findOne(id);

    this.categories = this.categories.map((category): Category => {
      if (category.id === id) {
        categoryDB.updatedAt = Date.now();
        categoryDB = {
          ...categoryDB,
          ...updateCategoryDto,
          id,
          name: updateCategoryDto.name ?? categoryDB.name,
          description: updateCategoryDto.description ?? categoryDB.description,
        };
        return categoryDB;
      }
      return category;
    });
  }

  delete(id: string) {
    this.findOne(id);
    this.categories = this.categories.filter((category) => category.id !== id);
  }

  seedCategories(categories: Category[]) {
    this.categories = categories;
  }
}
