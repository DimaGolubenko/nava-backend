// Core
import slugify from 'slugify';
import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString, MinLength } from 'class-validator';
import { BeforeInsert, Column, Entity } from 'typeorm';

// Entities
import { CoreEntity } from 'common/entities/core.entity';

@Entity({ name: 'sizes' })
export class Size extends CoreEntity {
  @ApiProperty({
    description: 'Флаг відображення розміру на клієнті',
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  @Column({ default: true })
  isActive?: boolean;

  @ApiProperty({ example: '42', description: 'Назва розміру' })
  @IsString()
  @Column()
  title: string;

  @ApiProperty({ description: 'slug для url', required: false })
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
