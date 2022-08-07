// Core
import { PickType } from '@nestjs/swagger';

// Entities
import { Category } from './../entities/category.entity';

export class CreateCategoryDto extends PickType(Category, [
  'isActive',
  'title',
  'slug',
]) {}
