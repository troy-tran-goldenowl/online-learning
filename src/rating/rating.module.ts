import { Module } from '@nestjs/common';
import { RatingController } from './rating.controller';
import { RatingService } from './rating.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CourseRating } from './entities/course-rating.entity';
import { InstructorRating } from './entities/intrusctor-rating.entity';
import { InstructorModule } from 'src/instructor/instructor.module';
import { CourseModule } from 'src/course/course.module';

@Module({
  controllers: [RatingController],
  providers: [RatingService],
  imports: [
    TypeOrmModule.forFeature([CourseRating, InstructorRating]),
    InstructorModule,
    CourseModule,
  ],
})
export class RatingModule {}
