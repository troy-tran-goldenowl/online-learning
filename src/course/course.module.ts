import { Module } from '@nestjs/common';
import { CourseService } from './course.service';
import { CourseController } from './course.controller';
import { InstructorModule } from 'src/instructor/instructor.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from './entities/course.entity';
import { CourseFinderService } from './course-finder.service';

@Module({
  providers: [CourseService, CourseFinderService],
  controllers: [CourseController],
  imports: [TypeOrmModule.forFeature([Course]), InstructorModule],
  exports: [CourseService, CourseFinderService],
})
export class CourseModule {}
