// Core
import { Repository } from 'typeorm';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

// Entities
import { Product } from '../entities/product.entity';

// DTOs
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { ProductsOutput } from '../dto/products.dto';
import { PaginationInput } from 'common/dto/pagination.dto';

// Exceptions
import { NotFoundProductException } from '../exceptions/not-found-product.exception';

// Services
import { ProductSizesService } from './product-sizes.service';
import { ProductImagesService } from './product-images.service';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepo: Repository<Product>,
    private readonly productSizesService: ProductSizesService,
    private readonly productImagesService: ProductImagesService,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<void> {
    try {
      const newProduct = await this.productRepo.save(
        this.productRepo.create(createProductDto),
      );
      await this.productImagesService.createList(createProductDto, newProduct);
      await this.productSizesService.createList(createProductDto, newProduct);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async findList({
    page = 1,
    perPage = 12,
  }: PaginationInput): Promise<ProductsOutput> {
    try {
      const results = await this.productRepo.find({
        relations: ['images', 'sizes', 'sizes.size'],
        skip: (page - 1) * perPage,
        take: perPage,
      });
      const totalResults = await this.productRepo.count();
      return {
        results,
        page,
        perPage,
        totalResults,
      };
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async findOne(id: number): Promise<Product> {
    try {
      const result = await this.productRepo.findOne({
        where: { id },
        relations: ['images', 'sizes', 'sizes.size'],
      });
      if (!result) {
        throw new NotFoundProductException(id);
      }
      return result;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    try {
      await this.findOne(id);
      this.productRepo.save({ id, ...updateProductDto });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async remove(id: number): Promise<void> {
    try {
      await this.findOne(id);
      this.productRepo.delete(id);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
