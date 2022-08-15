// Core
import { NotFoundSizeException } from './exceptions/not-found-size.exception';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

// Entities
import { Size } from './entities/size.entity';

// DTOs
import { CreateSizeDto } from './dto/create-size.dto';
import { UpdateSizeDto } from './dto/update-size.dto';

@Injectable()
export class SizesService {
  constructor(
    @InjectRepository(Size)
    private readonly sizeRepo: Repository<Size>,
  ) {}

  create(createSizeDto: CreateSizeDto): Promise<Size> {
    try {
      return this.sizeRepo.save(this.sizeRepo.create(createSizeDto));
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  findAll(): Promise<Size[]> {
    return this.sizeRepo.find();
  }

  async findOne(id: number): Promise<Size> {
    const size = await this.sizeRepo.findOneBy({ id });
    if (!size) {
      throw new NotFoundSizeException(id);
    }
    return size;
  }

  async update(id: number, updateSizeDto: UpdateSizeDto): Promise<void> {
    try {
      const size = await this.findOne(id);
      this.sizeRepo.save({ id, ...updateSizeDto });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async remove(id: number): Promise<void> {
    try {
      const size = await this.findOne(id);
      this.sizeRepo.delete(id);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
