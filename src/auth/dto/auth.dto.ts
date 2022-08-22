import { User } from 'users/entities/user.entity';

export class AuthOutput {
  user: Partial<User>;
  refreshToken: string;
  accessToken: string;
}
