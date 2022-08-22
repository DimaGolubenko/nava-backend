// Core
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
  HttpCode,
  Put,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

// Entities
import { User } from './entities/user.entity';

// DTOs
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

// Services
import { UsersService } from './users.service';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'Create' })
  @UsePipes(ValidationPipe)
  @HttpCode(201)
  @Post()
  create(@Body() createUserDto: CreateUserDto): Promise<void> {
    return this.usersService.create(createUserDto);
  }

  @ApiOperation({ summary: 'Find list' })
  @Get()
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @ApiOperation({ summary: 'Find one' })
  @Get(':id')
  findOne(@Param('id') id: string): Promise<User> {
    return this.usersService.findOne(+id);
  }

  @ApiOperation({ summary: 'Get profile' })
  @Get(':id/profile')
  getProfile(@Param('id') id: string): Promise<User> {
    return this.usersService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update' })
  @UsePipes(ValidationPipe)
  @HttpCode(201)
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<void> {
    return this.usersService.update(+id, updateUserDto);
  }

  @ApiOperation({ summary: 'Remove' })
  @HttpCode(204)
  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.usersService.remove(+id);
  }
}
