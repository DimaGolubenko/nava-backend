// Core
import { PartialType } from '@nestjs/swagger';

// DTOs
import { CreateCategoryDto } from './create-category.dto';

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {}
