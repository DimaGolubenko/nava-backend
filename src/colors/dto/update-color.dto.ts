// Core
import { PartialType } from '@nestjs/swagger';

// DTOs
import { CreateColorDto } from './create-color.dto';

export class UpdateColorDto extends PartialType(CreateColorDto) {}
