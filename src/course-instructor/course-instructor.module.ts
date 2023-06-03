import { Module } from '@nestjs/common';
import { CourseInstructorService } from './course-instructor.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from 'src/course/entities/course.entity';
import { Instructor } from 'src/instructor/entities/instructor.entity';

@Module({
  providers: [CourseInstructorService],
  imports: [TypeOrmModule.forFeature([Course, Instructor])],
  exports: [CourseInstructorService],
})
export class CourseInstructorModule {}
