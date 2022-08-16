// Core
import { PartialType } from '@nestjs/swagger';

// DTOs
import { CreateProductDto } from './create-product.dto';

export class UpdateProductDto extends PartialType(CreateProductDto) {}
