import { applyDecorators, UseGuards } from '@nestjs/common';
import { AdminGuard } from 'auth/guards/admin.guard';
import { JwtAuthGuard } from 'auth/guards/jwt-auth.guard';
import { UserRole } from 'users/users.interface';

export const Auth = (role: UserRole = UserRole.Guest) =>
  applyDecorators(
    role === UserRole.Administrator
      ? UseGuards(JwtAuthGuard, AdminGuard)
      : UseGuards(JwtAuthGuard),
  );
