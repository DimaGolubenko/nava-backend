// Core
import { PickType } from '@nestjs/swagger';

// Entities
import { Size } from './../entities/size.entity';

export class CreateSizeDto extends PickType(Size, [
  'isActive',
  'title',
  'slug',
]) {}
