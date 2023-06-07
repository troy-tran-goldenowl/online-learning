import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CourseRating } from './entities/course-rating.entity';
import { InstructorRating } from './entities/intrusctor-rating.entity';
import { CreateInstructorRatingDto } from './dtos/create-instructor-rating.dto';
import { CreateCourseRatingDto } from './dtos/create-course-rating.dto';

@Injectable()
export class RatingService {
  constructor(
    @InjectRepository(InstructorRating)
    private readonly instructorRatingRepository: Repository<InstructorRating>,
    @InjectRepository(CourseRating)
    private readonly courseRatingRepository: Repository<CourseRating>,
  ) {}

  async createInstructorRating(
    instructorId: number,
    createRatingDto: CreateInstructorRatingDto,
    userId: number,
  ) {
    const instructorRating = this.instructorRatingRepository.create({
      instructor: { id: instructorId },
      user: { id: userId },
      ...createRatingDto,
    });
    return this.instructorRatingRepository.save(instructorRating);
  }

  async createCourseRating(
    courseId: number,
    createRatingDto: CreateCourseRatingDto,
    userId: number,
  ) {
    const courseRating = this.courseRatingRepository.create({
      course: { id: courseId },
      user: { id: userId },
      ...createRatingDto,
    });
    return this.courseRatingRepository.save(courseRating);
  }
}
