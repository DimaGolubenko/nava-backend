// Core
import { Column, Entity, ManyToOne } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional } from 'class-validator';

// Entities
import { CoreEntity } from 'common/entities/core.entity';
import { Size } from './../../sizes/entities/size.entity';
import { Product } from './product.entity';

@Entity({ name: 'product-sizes' })
export class ProductSize extends CoreEntity {
  @ApiProperty({ description: 'Ціна товару певного розміру', required: false })
  @IsOptional()
  @IsNumber()
  @Column({ nullable: true })
  price?: number;

  @ApiProperty({ description: 'Акційна ціна', required: false })
  @IsOptional()
  @IsNumber()
  @Column({ nullable: true })
  discountPrice?: number;

  @ManyToOne(() => Size, {
    onDelete: 'CASCADE',
  })
  size: Size;

  @ApiProperty({ description: 'ID розміру товару' })
  @IsNumber()
  @Column()
  sizeId: number;

  @ManyToOne(() => Product, { onDelete: 'CASCADE' })
  product: Product;

  @ApiProperty({ description: 'ID товару' })
  @IsOptional()
  @IsNumber()
  @Column()
  productId: number;
}
