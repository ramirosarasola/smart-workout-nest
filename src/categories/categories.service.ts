import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';
import { v4 as uuid } from 'uuid';

@Injectable()
export class CategoriesService {
  private categories: Category[] = [];

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

  fillCategoriesWithSeedData(categories: Category[]) {
    this.categories = categories;
  }
}
