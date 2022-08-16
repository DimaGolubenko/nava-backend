// Core
import { OmitType } from '@nestjs/swagger';

// Entities
import { Product } from 'products/entities/product.entity';

export class CreateProductDto extends OmitType(Product, [
  'id',
  'createdAt',
  'updatedAt',
]) {}
