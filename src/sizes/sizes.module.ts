// Core
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

// Entities
import { Size } from './entities/size.entity';

// Services
import { SizesService } from './sizes.service';

// Controllers
import { SizesController } from './sizes.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Size])],
  controllers: [SizesController],
  providers: [SizesService],
  exports: [TypeOrmModule, SizesService],
})
export class SizesModule {}
