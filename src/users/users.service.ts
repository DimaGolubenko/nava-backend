// Core
import { NotFoundUserException } from './exceptions/not-found-user.exception';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

// Entities
import { User } from './entities/user.entity';

// DTOs
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<void> {
    try {
      await this.userRepo.save(this.userRepo.create(createUserDto));
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  findAll(): Promise<User[]> {
    try {
      return this.userRepo.find();
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async findOne(id: number): Promise<User> {
    try {
      const user = await this.userRepo.findOneBy({ id });
      if (!user) {
        throw new NotFoundUserException(id);
      }
      return user;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<void> {
    try {
      await this.findOne(id);
      await this.userRepo.save({ id, ...updateUserDto });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async remove(id: number): Promise<void> {
    try {
      await this.findOne(id);
      this.userRepo.delete(id);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
