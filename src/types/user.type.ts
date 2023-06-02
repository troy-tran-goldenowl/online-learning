import { User } from 'src/user/entities/user.entity';

export type UserWithoutPassword = Omit<User, 'password'>;
export type UserWithToken = {
  user: User;
  access_token;
};
