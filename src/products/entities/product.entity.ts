// Core
import { ApiProperty } from '@nestjs/swagger';
import { customAlphabet } from 'nanoid';
import { Type } from 'class-transformer';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import {
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

// Entities
import { CoreEntity } from 'common/entities/core.entity';
import { Category } from 'categories/entities/category.entity';
import { ProductImage } from './product-image.entity';
import { ProductSize } from './product-size.entity';

@Entity({ name: 'products' })
export class Product extends CoreEntity {
  @ApiProperty({ description: 'Чи активоване зображення', required: false })
  @IsOptional()
  @IsBoolean()
  @Column({ default: true })
  isActive?: boolean;

  @ApiProperty({ description: 'Чи є зображення новинкою', required: false })
  @IsOptional()
  @IsBoolean()
  @Column({ default: false })
  isNew?: boolean;

  @ApiProperty({ description: 'Чи є зображення популярним', required: false })
  @IsOptional()
  @IsBoolean()
  @Column({ default: false })
  isPopular?: boolean;

  @ApiProperty({ description: 'Назва товару' })
  @IsString()
  @Column()
  title: string;

  @ApiProperty({ description: 'Опис товару', required: false })
  @IsOptional()
  @IsString()
  @Column()
  description?: string;

  @ApiProperty({
    description: 'Скільки товарів готові до відправки',
    required: false,
  })
  @IsOptional()
  @IsNumber()
  @Column({ default: 0 })
  inStock?: number;

  @ApiProperty({ description: 'Базова вартість' })
  @IsNumber()
  @Column()
  basePrice: number;

  @ApiProperty({ description: 'Акційна ціна', required: false })
  @IsOptional()
  @IsNumber()
  @Column({ nullable: true })
  discountPrice?: number;

  @Column({ default: () => customAlphabet('1234567890', 7)() })
  sku?: string;

  @ManyToOne(() => Category, { onDelete: 'SET NULL', nullable: true })
  category: Category;

  @ApiProperty({ description: 'ID категорії товарів' })
  @IsNumber()
  categoryId: number;

  @ApiProperty({ type: () => [ProductImage] })
  @ValidateNested({ each: true })
  @Type(() => ProductImage)
  @OneToMany(() => ProductImage, (productImages) => productImages.product)
  images: ProductImage[];

  @ApiProperty({ type: () => [ProductSize] })
  @ValidateNested({ each: true })
  @Type(() => ProductSize)
  @OneToMany(() => ProductSize, (productSize) => productSize.product)
  sizes: ProductSize[];

  @OneToMany(() => Product, (product) => product.id)
  relatedProducts: Product[];

  @ApiProperty({ type: () => [Number], description: "ID пов'язаних продуктів" })
  relatedProductsIds: number[];
}
