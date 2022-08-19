// Core
import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';
import { Column, Entity, ManyToOne } from 'typeorm';

// Entities
import { CoreEntity } from 'common/entities/core.entity';
import { Product } from './product.entity';

@Entity({ name: 'product-images' })
export class ProductImage extends CoreEntity {
  @ApiProperty({ description: 'Посилання на зображення' })
  @IsString()
  @Column()
  src: string;

  @ManyToOne(() => Product, (product) => product.images, {
    onDelete: 'CASCADE',
  })
  product: Product;

  @ApiProperty({ description: 'ID товару' })
  @IsOptional()
  @IsNumber()
  @Column()
  productId: number;

  @ApiProperty({ description: 'Чи є зображення головним', required: false })
  @IsOptional()
  @IsBoolean()
  @Column({ default: false })
  isMain?: boolean;
}
