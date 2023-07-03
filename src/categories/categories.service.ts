// Core
import { NotFoundCategoryException } from './exceptions/not-found-category.exception';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

// Entities
import { Category } from './entities/category.entity';

// DTOs
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepo: Repository<Category>,
  ) {}

  create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    try {
      const newCategory = this.categoryRepo.create(createCategoryDto);
      return this.categoryRepo.save(newCategory);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  findAll(): Promise<Category[]> {
    return this.categoryRepo.find({ order: { createdAt: 'DESC' } });
  }

  async findOne(id: number): Promise<Category> {
    const category = await this.categoryRepo.findOneBy({ id });
    if (!category) {
      throw new NotFoundCategoryException(id);
    }
    return category;
  }

  async update(
    id: number,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<void> {
    try {
      const category = await this.categoryRepo.findOneBy({ id });
      if (!category) {
        throw new NotFoundCategoryException(id);
      }
      this.categoryRepo.save({ id, ...updateCategoryDto });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async remove(id: number): Promise<void> {
    try {
      const category = await this.categoryRepo.findOneBy({ id });
      if (!category) {
        throw new NotFoundCategoryException(id);
      }
      this.categoryRepo.delete(id);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
