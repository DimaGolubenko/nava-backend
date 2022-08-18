// Core
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

// Entities
import { Category } from './entities/category.entity';

// Services
import { CategoriesService } from './categories.service';

// Controllers
import { CategoriesController } from './categories.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Category])],
  controllers: [CategoriesController],
  providers: [CategoriesService],
  exports: [CategoriesService],
})
export class CategoriesModule {}
