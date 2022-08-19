// Core
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

// Entities
import { ProductImage } from 'products/entities/product-image.entity';
import { Product } from 'products/entities/product.entity';

// DTOs
import { CreateProductImageDto } from 'products/dto/create-product-image.dto';
import { UpdateProductImageDto } from 'products/dto/update-product-image.dto';

@Injectable()
export class ProductImagesService {
  constructor(
    @InjectRepository(ProductImage)
    private readonly productImageRepo: Repository<ProductImage>,
  ) {}

  async createOrUpdateList(
    createProductImageDto: CreateProductImageDto[] | UpdateProductImageDto[],
    product: Product,
  ): Promise<ProductImage[]> {
    const images = createProductImageDto.map((image) => ({
      ...image,
      product,
    }));
    return this.productImageRepo.create(images);
  }
}
