// Core
import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';

// Entities
import { User } from 'users/entities/user.entity';

// Types
import { UserRole } from 'users/users.interface';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor() {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<{ user: User }>();
    const user = request.user;

    if (user.role !== UserRole.Administrator) {
      throw new ForbiddenException('You have no rights');
    }
    return true;
  }
}
