// Core
import { PartialType } from '@nestjs/swagger';

// DTOs
import { CreateProductImageDto } from 'products/dto/create-product-image.dto';

export class UpdateProductImageDto extends PartialType(CreateProductImageDto) {}
