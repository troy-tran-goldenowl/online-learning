import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Course } from './entities/course.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CourseFinderService {
  constructor(
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,
  ) {}

  async findCourseById(courseId: number): Promise<Course> {
    const course = await this.courseRepository.findOneBy({ id: courseId });

    if (!course) {
      throw new NotFoundException('Course not found');
    }

    return course;
  }
}
