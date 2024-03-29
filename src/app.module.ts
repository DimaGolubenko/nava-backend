// Core
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

// Configs
import { getMysqlDbConfig } from 'config/mysql.config';

// Modules
import { CategoriesModule } from 'categories/categories.module';
import { SizesModule } from 'sizes/sizes.module';
import { ProductsModule } from 'products/products.module';
import { FilesModule } from 'files/files.module';
import { UsersModule } from 'users/users.module';
import { AuthModule } from 'auth/auth.module';
import { ColorsModule } from 'colors/colors.module';

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
    AuthModule,
    UsersModule,
    ProductsModule,
    CategoriesModule,
    SizesModule,
    FilesModule,
    ColorsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
