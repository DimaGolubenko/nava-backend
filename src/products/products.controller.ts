// Core
import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  Delete,
  UsePipes,
  ValidationPipe,
  HttpCode,
  Put,
  Param,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

// Entities
import { Product } from 'products/entities/product.entity';

// DTOs
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductsOutput } from './dto/products.dto';
import { PaginationInput } from 'common/dto/pagination.dto';

// Services
import { ProductsService } from './services/products.service';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @ApiOperation({ summary: 'Create' })
  @UsePipes(ValidationPipe)
  @HttpCode(201)
  @Post()
  create(@Body() createProductDto: CreateProductDto): Promise<void> {
    return this.productsService.create(createProductDto);
  }

  @ApiOperation({ summary: 'Find list' })
  @UsePipes(ValidationPipe)
  @Get()
  findList(@Query() paginationInput: PaginationInput): Promise<ProductsOutput> {
    return this.productsService.findList(paginationInput);
  }

  @ApiOperation({ summary: 'Find one' })
  @Get(':id')
  findOne(@Param('id') id: string): Promise<Product> {
    return this.productsService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update' })
  @UsePipes(ValidationPipe)
  @HttpCode(201)
  @Put(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(+id, updateProductDto);
  }

  @ApiOperation({ summary: 'Remove' })
  @HttpCode(204)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }
}
