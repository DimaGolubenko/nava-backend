// Core
import slugify from 'slugify';
import { BeforeInsert, Column, Entity } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString, MinLength } from 'class-validator';

// Entities
import { CoreEntity } from 'common/entities/core.entity';

@Entity({ name: 'categories' })
export class Category extends CoreEntity {
  @ApiProperty({ description: 'Флаг відображення товару на клієнті' })
  @IsOptional()
  @IsBoolean()
  @Column({ default: true })
  isActive: boolean;

  @ApiProperty({ example: 'blouses', description: 'Назва категорії' })
  @IsString()
  @MinLength(3)
  @Column()
  title: string;

  @ApiProperty({ example: 'Блузи', description: 'slug для url' })
  @IsOptional()
  @IsString()
  @Column({ nullable: true })
  slug: string;

  @BeforeInsert()
  createSlug() {
    if (!this.slug) {
      this.slug = slugify(this.title, { lower: true });
    }
  }
}
