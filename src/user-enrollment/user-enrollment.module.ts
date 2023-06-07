import { Module } from '@nestjs/common';
import { UserEnrollmentService } from './user-enrollment.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from 'src/course/entities/course.entity';

@Module({
  providers: [UserEnrollmentService],
  imports: [TypeOrmModule.forFeature([Course])],
  exports: [UserEnrollmentService],
})
export class UserEnrollmentModule {}
