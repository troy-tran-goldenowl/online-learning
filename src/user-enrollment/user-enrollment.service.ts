import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Pagination, paginate } from 'nestjs-typeorm-paginate';
import { Course } from 'src/course/entities/course.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserEnrollmentService {
  constructor(
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,
  ) {}

  findEnrolledCoursesByUser(
    userId: number,
    page: number,
    limit: number,
  ): Promise<Pagination<Course>> {
    console.log({ userId });
    const enrolledCourses = this.courseRepository
      .createQueryBuilder('course')
      .innerJoin('course.enrollments', 'enrollment')
      .innerJoin('enrollment.user', 'user')
      .where('user.id = :userId', { userId });

    return paginate(enrolledCourses, { page, limit });
  }
}
