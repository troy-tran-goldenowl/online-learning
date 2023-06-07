import { Module } from '@nestjs/common';
import { EnrollmentController } from './enrollment.controller';
import { EnrollmentService } from './enrollment.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Enrollment } from './entities/enrollment.entity';
import { CourseModule } from 'src/course/course.module';

@Module({
  controllers: [EnrollmentController],
  providers: [EnrollmentService],
  imports: [TypeOrmModule.forFeature([Enrollment]), CourseModule],
  exports: [EnrollmentService],
})
export class EnrollmentModule {}
