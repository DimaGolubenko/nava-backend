// Core
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';

export class PaginationInput {
  @ApiProperty({
    description: 'Номер сторінки',
    required: false,
  })
  @Transform((exp) => Number(exp.value))
  @IsOptional()
  @IsNumber()
  page?: number;

  @ApiProperty({
    description: 'Кількість товарів на сторінці',
    required: false,
  })
  @Transform((exp) => Number(exp.value))
  @IsOptional()
  @IsNumber()
  perPage?: number;
}

export class PaginationOutput {
  totalPages?: number;
  totalResults?: number;
  page?: number;
  perPage?: number;
}
