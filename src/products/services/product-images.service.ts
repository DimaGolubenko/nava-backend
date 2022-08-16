// Core
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

// Entities
import { ProductImage } from 'products/entities/product-image.entity';
import { Product } from 'products/entities/product.entity';

// DTOs
import { CreateProductDto } from 'products/dto/create-product.dto';

@Injectable()
export class ProductImagesService {
  constructor(
    @InjectRepository(ProductImage)
    private readonly productImageRepo: Repository<ProductImage>,
  ) {}

  async createList(
    createProductDto: CreateProductDto,
    product: Product,
  ): Promise<void> {
    const images = createProductDto.images.map((image) =>
      this.productImageRepo.create({
        ...image,
        product,
      }),
    );
    await this.productImageRepo.save(images);
  }
}
