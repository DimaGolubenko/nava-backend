// Core
import { PartialType } from '@nestjs/swagger';

// DTOs
import { CreateSizeDto } from './create-size.dto';

export class UpdateSizeDto extends PartialType(CreateSizeDto) {}
