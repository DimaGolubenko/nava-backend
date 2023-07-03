// Core
import { PickType } from '@nestjs/swagger';

// Entities
import { Color } from 'colors/entities/color.entity';

export class CreateColorDto extends PickType(Color, [
  'isActive',
  'title',
  'slug',
]) {}
