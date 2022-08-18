// Core
import { ApiProperty, OmitType } from '@nestjs/swagger';
import { ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

// Entities
import { Product } from 'products/entities/product.entity';

// DTOs
import { CreateProductSizeDto } from 'products/dto/create-product-size.dto';
import { CreateProductImageDto } from './create-product-image.dto';

export class CreateProductDto extends OmitType(Product, [
  'id',
  'createdAt',
  'updatedAt',
  'sizes',
  'images',
  'category',
  'relatedProducts',
]) {
  @ApiProperty({ type: () => [CreateProductImageDto] })
  @ValidateNested({ each: true })
  @Type(() => CreateProductImageDto)
  images: CreateProductImageDto[];

  @ApiProperty({ type: () => [CreateProductSizeDto] })
  @ValidateNested({ each: true })
  @Type(() => CreateProductSizeDto)
  sizes: CreateProductSizeDto[];
}
