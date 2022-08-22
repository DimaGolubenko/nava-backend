// Core
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './strategies/jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

// Config
import { getJwtConfig } from 'config/jwtConfig';

// Services
import { AuthService } from './auth.service';

// Controllers
import { AuthController } from './auth.controller';

// Modules
import { UsersModule } from 'users/users.module';

// Guards
import { AdminGuard } from 'auth/guards/admin.guard';
import { JwtAuthGuard } from 'auth/guards/jwt-auth.guard';

// Strategies
import { LocalStrategy } from './strategies/local.strategy';

@Module({
  imports: [
    ConfigModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getJwtConfig,
    }),
    UsersModule,
  ],
  providers: [
    LocalStrategy,
    JwtStrategy,
    AuthService,
    JwtAuthGuard,
    AdminGuard,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
