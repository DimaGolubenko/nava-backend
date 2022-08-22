// Core
import { PartialType } from '@nestjs/swagger';

// DTOs
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {}
