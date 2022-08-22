// Core
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

// Entities
import { User } from './entities/user.entity';

// Services
import { UsersService } from './users.service';

// Controllers
import { UsersController } from './users.controller';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [TypeOrmModule],
})
export class UsersModule {}
