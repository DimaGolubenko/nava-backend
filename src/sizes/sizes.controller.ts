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
import { Size } from './entities/size.entity';

// DTOs
import { CreateSizeDto } from './dto/create-size.dto';
import { UpdateSizeDto } from './dto/update-size.dto';

//Services
import { SizesService } from './sizes.service';

@ApiTags('Sizes')
@Controller('sizes')
export class SizesController {
  constructor(private readonly sizesService: SizesService) {}

  @ApiOperation({ summary: 'Create' })
  @UsePipes(ValidationPipe)
  @HttpCode(201)
  @Post()
  create(@Body() createSizeDto: CreateSizeDto): Promise<Size> {
    return this.sizesService.create(createSizeDto);
  }

  @ApiOperation({ summary: 'Find all' })
  @Get()
  findAll(): Promise<Size[]> {
    return this.sizesService.findAll();
  }

  @ApiOperation({ summary: 'Find one' })
  @Get(':id')
  findOne(@Param('id') id: string): Promise<Size> {
    return this.sizesService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update' })
  @UsePipes(ValidationPipe)
  @HttpCode(201)
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateSizeDto: UpdateSizeDto,
  ): Promise<void> {
    return this.sizesService.update(+id, updateSizeDto);
  }

  @ApiOperation({ summary: 'Remove' })
  @HttpCode(204)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sizesService.remove(+id);
  }
}
