import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { SignUpDto } from './dtos/sign-up.dto';
import * as bcrypt from 'bcrypt';
import { User } from 'src/user/entities/user.entity';
import { UserWithToken } from 'src/types/user.type';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.userService.findByEmail(email);
    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);
      return isMatch ? user : null;
    }
    return null;
  }

  signIn(user: User): UserWithToken {
    const payload = { ...user };
    return {
      user,
      access_token: this.jwtService.sign(payload),
    };
  }

  signUp(signUpDto: SignUpDto): Promise<User> {
    return this.userService.create(signUpDto);
  }
}
