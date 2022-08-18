import { Product } from 'products/entities/product.entity';
import { PartialType } from '@nestjs/swagger';
// Core
import { ApiProperty, OmitType } from '@nestjs/swagger';
import { ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

// DTOs
import { CreateProductDto } from './create-product.dto';
import { UpdateProductSizeDto } from './update-product-size.dto';
import { UpdateProductImageDto } from './update-product-image.dto';

export class UpdateProductDto extends OmitType(Product, [
  'createdAt',
  'updatedAt',
  'sizes',
  'images',
  'category',
  'relatedProducts',
]) {
  @ApiProperty({ type: () => [UpdateProductImageDto] })
  @ValidateNested({ each: true })
  @Type(() => UpdateProductImageDto)
  images: UpdateProductImageDto[];

  @ApiProperty({ type: () => [UpdateProductSizeDto] })
  @ValidateNested({ each: true })
  @Type(() => UpdateProductSizeDto)
  sizes: UpdateProductSizeDto[];
}
