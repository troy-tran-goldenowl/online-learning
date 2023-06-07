import { Controller, Get, UseGuards } from '@nestjs/common';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { User } from './entities/user.entity';

@Controller('user')
@UseGuards(JwtAuthGuard)
export class UserController {
  @Get('profile')
  getProfile(@CurrentUser() user: User) {
    return user;
  }
}
