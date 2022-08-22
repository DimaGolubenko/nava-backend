// Core
import { OmitType } from '@nestjs/swagger';

// Entities
import { User } from 'users/entities/user.entity';

export class CreateUserDto extends OmitType(User, [
  'id',
  'createdAt',
  'updatedAt',
]) {}
