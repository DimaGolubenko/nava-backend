// Core
import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString } from 'class-validator';
import slugify from 'slugify';
import { BeforeInsert, Column, Entity } from 'typeorm';

// Entities
import { CoreEntity } from 'common/entities/core.entity';

@Entity({ name: 'colors' })
export class Color extends CoreEntity {
  @ApiProperty({
    description: 'Флаг відображення кольору на клієнті',
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  @Column({ default: true })
  isActive?: boolean;

  @ApiProperty({ example: 'чорний', description: 'Назва кольору' })
  @IsString()
  @Column()
  title: string;

  @ApiProperty({
    example: 'black',
    description: 'slug для url',
    required: false,
  })
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
