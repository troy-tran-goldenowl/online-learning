import { Module } from '@nestjs/common';
import { LessonService } from './lesson.service';
import { LessonController } from './lesson.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Lesson } from './entities/lesson.entity';
import { CourseModule } from 'src/course/course.module';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';
import { InstructorModule } from 'src/instructor/instructor.module';
import { EnrollmentModule } from 'src/enrollment/enrollment.module';

@Module({
  providers: [LessonService],
  controllers: [LessonController],
  imports: [
    TypeOrmModule.forFeature([Lesson]),
    CourseModule,
    CloudinaryModule,
    InstructorModule,
    EnrollmentModule,
  ],
})
export class LessonModule {}
