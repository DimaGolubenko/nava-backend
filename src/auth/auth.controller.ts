// Core
import {
  Body,
  Controller,
  HttpCode,
  Post,
  Req,
  Request,
  Res,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

// Services
import { AuthService } from './auth.service';

// DTOs
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { AuthOutput } from './dto/auth.dto';
import { RegisterDto } from './dto/register.dto';

// Guards
import { LocalAuthGuard } from './guards/local-auth.guard';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Register' })
  @UsePipes(ValidationPipe)
  @HttpCode(201)
  @Post('register')
  async register(
    @Body() registerDto: RegisterDto,
    @Res({ passthrough: true }) response,
  ): Promise<AuthOutput> {
    const authOutput = await this.authService.register(registerDto);
    response.cookie('refreshToken', authOutput.refreshToken, {
      httpOnly: true,
    });
    return authOutput;
  }

  @ApiOperation({ summary: 'Login' })
  @UseGuards(LocalAuthGuard)
  @Post('login')
  @HttpCode(200)
  login(
    @Request() req,
    @Res({ passthrough: true }) response,
  ): Promise<AuthOutput> {
    response.cookie('refreshToken', req.user.refreshToken, { httpOnly: true });
    return req.user;
  }

  @ApiOperation({ summary: 'Refresh tokens' })
  @UsePipes(ValidationPipe)
  @Post('refresh-tokens')
  @HttpCode(200)
  refreshTokens(
    @Body() refreshToken: RefreshTokenDto,
    @Req() request,
  ): Promise<AuthOutput> {
    console.log('refreshToken', request.cookies['refreshToken']);
    return this.authService.refreshTokens(refreshToken);
  }
}
