import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserController } from './user.controller';
import { UserEnrollmentModule } from 'src/user-enrollment/user-enrollment.module';

@Module({
  providers: [UserService],
  imports: [TypeOrmModule.forFeature([User]), UserEnrollmentModule],
  exports: [UserService],
  controllers: [UserController],
})
export class UserModule {}
