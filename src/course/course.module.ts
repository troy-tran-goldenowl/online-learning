import { Module, forwardRef } from '@nestjs/common';
import { CourseService } from './course.service';
import { CourseController } from './course.controller';
import { InstructorModule } from 'src/instructor/instructor.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from './entities/course.entity';

@Module({
  providers: [CourseService],
  controllers: [CourseController],
  imports: [
    TypeOrmModule.forFeature([Course]),
    forwardRef(() => InstructorModule),
  ],
  exports: [CourseService],
})
export class CourseModule {}
