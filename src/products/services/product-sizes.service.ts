// Core
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

// Entities
import { ProductSize } from 'products/entities/product-size.entity';
import { Product } from 'products/entities/product.entity';

// DTOs
import { CreateProductSizeDto } from 'products/dto/create-product-size.dto';
import { UpdateProductSizeDto } from 'products/dto/update-product-size.dto';

// Services
import { SizesService } from 'sizes/sizes.service';

@Injectable()
export class ProductSizesService {
  constructor(
    @InjectRepository(ProductSize)
    private readonly productSizeRepo: Repository<ProductSize>,
    private readonly sizesService: SizesService,
  ) {}

  async createOrUpdateList(
    productSizesDto: CreateProductSizeDto[] | UpdateProductSizeDto[],
    product: Product,
  ): Promise<ProductSize[]> {
    const sizes = [];
    for (const sizeItem of productSizesDto) {
      const sizeEntity = await this.sizesService.findOne(sizeItem.sizeId);
      sizes.push(
        this.productSizeRepo.create({
          ...sizeItem,
          size: sizeEntity,
          product,
        }),
      );
    }
    return sizes;
  }
}
