// Core
import { PickType } from '@nestjs/swagger';

// Entities
import { ProductSize } from 'products/entities/product-size.entity';

export class CreateProductSizeDto extends PickType(ProductSize, [
  'price',
  'discountPrice',
  'productId',
  'sizeId',
]) {}
