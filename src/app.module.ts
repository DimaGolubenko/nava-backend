// Core
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

// Modules
import { CategoriesModule } from './categories/categories.module';
import { SizesModule } from './sizes/sizes.module';
import { ProductsModule } from './products/products.module';

// Configs
import { getMysqlDbConfig } from 'config/mysql.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getMysqlDbConfig,
    }),
    CategoriesModule,
    SizesModule,
    ProductsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
