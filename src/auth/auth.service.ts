// Core
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { hash, genSalt, compare } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

// Entities
import { User } from 'users/entities/user.entity';

// DTOs
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { AuthOutput } from './dto/auth.dto';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto): Promise<AuthOutput> {
    const user = await this.userRepo.findOneBy({ email: registerDto.email });
    if (user) {
      throw new BadRequestException(
        `User with email ${registerDto.email} already exists`,
      );
    }
    try {
      const salt = await genSalt(10);
      const hashedPassword = await hash(registerDto.password, salt);
      registerDto.password = hashedPassword;

      const newUser = await this.userRepo.save(
        this.userRepo.create(registerDto),
      );

      const tokens = await this.generateTokens(newUser.id);
      return {
        user: this.returnUserFields(newUser),
        ...tokens,
      };
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async login(loginDto: LoginDto): Promise<AuthOutput> {
    const user = await this.validateUser(loginDto);
    const tokens = await this.generateTokens(user.id);
    return {
      user,
      ...tokens,
    };
  }

  async refreshTokens({ refreshToken }: RefreshTokenDto): Promise<AuthOutput> {
    if (!refreshToken) {
      throw new UnauthorizedException('Not found refresh token in request');
    }
    const validToken = await this.jwtService.verifyAsync(refreshToken);
    if (!validToken) {
      throw new UnauthorizedException('Invalid refresh token or expired');
    }

    const user = await this.userRepo.findOneBy({ id: validToken.id });
    const tokens = await this.generateTokens(user.id);

    return {
      user: this.returnUserFields(user),
      ...tokens,
    };
  }

  private async validateUser(loginDto: LoginDto): Promise<Partial<User>> {
    const user = await this.userRepo.findOneBy({ email: loginDto.email });
    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }
    const isValidPassword = await compare(loginDto.password, user.password);
    if (!isValidPassword) {
      throw new UnauthorizedException('Invalid email or password');
    }
    return this.returnUserFields(user);
  }

  private async generateTokens(userId: number) {
    const data = {
      id: userId,
    };
    const refreshToken = await this.jwtService.signAsync(data, {
      expiresIn: '15d',
    });
    const accessToken = await this.jwtService.signAsync(data, {
      expiresIn: '1h',
    });
    return { refreshToken, accessToken };
  }

  private returnUserFields(user: User): Partial<User> {
    const { id, email, role, firstName, lastName } = user;
    return {
      id,
      email,
      role,
      firstName,
      lastName,
    };
  }
}
