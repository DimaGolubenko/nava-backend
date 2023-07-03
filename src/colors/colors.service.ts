// Core
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

// Entities
import { Color } from './entities/color.entity';

// DTOs
import { CreateColorDto } from './dto/create-color.dto';
import { UpdateColorDto } from './dto/update-color.dto';

// Exceptions
import { NotFoundColorException } from './exceptions/not-found-color.exception';

@Injectable()
export class ColorsService {
  constructor(
    @InjectRepository(Color)
    private readonly colorRepo: Repository<Color>,
  ) {}

  create(createColorDto: CreateColorDto): Promise<Color> {
    try {
      const newColor = this.colorRepo.create(createColorDto);
      return this.colorRepo.save(newColor);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  findAll(): Promise<Color[]> {
    return this.colorRepo.find({ order: { createdAt: 'DESC' } });
  }

  async findOne(id: number): Promise<Color> {
    const color = await this.colorRepo.findOneBy({ id });
    if (!color) {
      throw new NotFoundColorException(id);
    }
    return color;
  }

  async update(id: number, updateColorDto: UpdateColorDto): Promise<void> {
    try {
      const color = await this.colorRepo.findOneBy({ id });
      if (!color) {
        throw new NotFoundColorException(id);
      }
      this.colorRepo.save({ id, ...updateColorDto });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async remove(id: number): Promise<void> {
    try {
      const color = await this.colorRepo.findOneBy({ id });
      if (!color) {
        throw new NotFoundColorException(id);
      }
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
