// Core
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

// Entities
import { ProductSize } from './entities/product-size.entity';
import { ProductImage } from './entities/product-image.entity';
import { Product } from './entities/product.entity';

// Services
import { ProductsService } from './services/products.service';
import { ProductSizesService } from './services/product-sizes.service';
import { ProductImagesService } from './services/product-images.service';

// Controllers
import { ProductsController } from './products.controller';

// Modules
import { SizesModule } from 'sizes/sizes.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product, ProductImage, ProductSize]),
    SizesModule,
  ],
  controllers: [ProductsController],
  providers: [ProductsService, ProductSizesService, ProductImagesService],
})
export class ProductsModule {}
