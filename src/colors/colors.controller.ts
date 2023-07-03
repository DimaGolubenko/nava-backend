// Core
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

// Services
import { ColorsService } from './colors.service';

// DTOs
import { CreateColorDto } from './dto/create-color.dto';
import { UpdateColorDto } from './dto/update-color.dto';

// Entities
import { Color } from './entities/color.entity';

@ApiTags('Colors')
@Controller('colors')
export class ColorsController {
  constructor(private readonly colorsService: ColorsService) {}

  @ApiOperation({ summary: 'Create' })
  @UsePipes(ValidationPipe)
  @HttpCode(201)
  @Post()
  create(@Body() createColorDto: CreateColorDto): Promise<Color> {
    return this.colorsService.create(createColorDto);
  }

  @ApiOperation({ summary: 'FindAll' })
  @Get()
  findAll(): Promise<Color[]> {
    return this.colorsService.findAll();
  }

  @ApiOperation({ summary: 'Find one' })
  @Get(':id')
  findOne(@Param('id') id: string): Promise<Color> {
    return this.colorsService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update' })
  @UsePipes(ValidationPipe)
  @HttpCode(201)
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateColorDto: UpdateColorDto,
  ): Promise<void> {
    return this.colorsService.update(+id, updateColorDto);
  }

  @ApiOperation({ summary: 'Remove' })
  @HttpCode(204)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.colorsService.remove(+id);
  }
}
