import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Course } from './entities/course.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CourseService {
  constructor(
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,
  ) {}

  findAllByUserId(userId: number): Promise<Course[]> {
    return this.courseRepository.findBy({
      instructor: { user: { id: userId } },
    });
  }
}
