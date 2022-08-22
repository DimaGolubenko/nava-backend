// Core
import { DataSource, Repository } from 'typeorm';
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
    private dataSource: DataSource,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<void> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const newProduct = this.productRepo.create(createProductDto);
      await queryRunner.manager.save(newProduct);
      const images = await this.productImagesService.createOrUpdateList(
        createProductDto.images,
        newProduct,
      );
      await queryRunner.manager.save(images);
      const sizes = await this.productSizesService.createOrUpdateList(
        createProductDto.sizes,
        newProduct,
      );
      await queryRunner.manager.save(sizes);

      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw new InternalServerErrorException(err.message);
    } finally {
      await queryRunner.release();
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
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      await this.findOne(id);
      // Update product
      const updatedProduct = this.productRepo.create({
        ...updateProductDto,
        id,
      });

      await queryRunner.manager.save(updatedProduct);
      // Update images
      const images = await this.productImagesService.createOrUpdateList(
        updateProductDto.images,
        updatedProduct,
      );
      await queryRunner.manager.save(images);
      // Update sizes
      const sizes = await this.productSizesService.createOrUpdateList(
        updateProductDto.sizes,
        updatedProduct,
      );
      await queryRunner.manager.save(sizes);
      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw new InternalServerErrorException(err.message);
    } finally {
      await queryRunner.release();
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
