import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  IPaginationOptions,
  Pagination,
  paginate,
} from 'nestjs-typeorm-paginate';
import { Course } from 'src/course/entities/course.entity';
import { Instructor } from 'src/instructor/entities/instructor.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CourseInstructorService {
  constructor(
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,
    @InjectRepository(Instructor)
    private readonly instructorRepository: Repository<Instructor>,
  ) {}

  async findAllCourseByUserId(
    userId: number,
    page: number,
    limit: number,
  ): Promise<Pagination<Course>> {
    const instructor = await this.instructorRepository.findOneBy({
      user: { id: userId },
    });

    const query = this.courseRepository
      .createQueryBuilder('course')
      .where('course.instructor = :instructorId', {
        instructorId: instructor.id,
      });

    return paginate(query, { page, limit });
  }
}
