// Core
import { PartialType } from '@nestjs/swagger';

// DTOs
import { CreateProductSizeDto } from 'products/dto/create-product-size.dto';

export class UpdateProductSizeDto extends PartialType(CreateProductSizeDto) {}
