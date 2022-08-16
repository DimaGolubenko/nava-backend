// Core
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

// Entities
import { ProductSize } from 'products/entities/product-size.entity';
import { Size } from 'sizes/entities/size.entity';
import { Product } from 'products/entities/product.entity';

// DTOs
import { CreateProductDto } from './../dto/create-product.dto';

@Injectable()
export class ProductSizesService {
  constructor(
    @InjectRepository(ProductSize)
    private readonly productSizeRepo: Repository<ProductSize>,
    @InjectRepository(Size)
    private readonly sizeRepo: Repository<Size>,
  ) {}

  async createList(
    createProductDto: CreateProductDto,
    product: Product,
  ): Promise<void> {
    const sizes = [];
    for (const size of createProductDto.sizes) {
      const sizeEntity = await this.sizeRepo.findOneBy({ id: size.sizeId });
      sizes.push(
        this.productSizeRepo.create({
          ...size,
          size: sizeEntity,
          product,
        }),
      );
    }
    await this.productSizeRepo.save(sizes);
  }
}
