// Core
import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEnum,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { Column, Entity } from 'typeorm';

// Entities
import { CoreEntity } from 'common/entities/core.entity';

// Types
import { UserRole } from 'users/users.interface';

@Entity({ name: 'users' })
export class User extends CoreEntity {
  @ApiProperty({ description: 'Статус активності', required: false })
  @IsOptional()
  @IsBoolean()
  @Column({ default: true })
  isActive?: boolean;

  @ApiProperty({ description: 'Електронна адреса' })
  @IsString()
  @Column({ unique: true })
  email: string;

  @ApiProperty({ description: 'Пароль' })
  @IsString()
  @MinLength(6)
  @Column()
  password: string;

  @ApiProperty({ description: 'Телефонний номер' })
  @IsString()
  @Column({ unique: true })
  phone: string;

  @ApiProperty({ description: "Ім'я" })
  @IsString()
  @Column()
  firstName: string;

  @ApiProperty({ description: 'Прізвище', required: false })
  @IsString()
  @Column()
  lastName: string;

  @ApiProperty({ description: 'Роль', required: false })
  @IsEnum(UserRole)
  @Column({ default: UserRole.Guest })
  role: UserRole;
}
