// Core
import { PickType } from '@nestjs/swagger';

// Entities
import { ProductImage } from 'products/entities/product-image.entity';

export class CreateProductImageDto extends PickType(ProductImage, [
  'src',
  'productId',
  'isMain',
]) {}
