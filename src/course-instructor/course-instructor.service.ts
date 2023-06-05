import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
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

  async findAllCourseByUserId(userId: number): Promise<Course[]> {
    const instructor = await this.instructorRepository.findOneBy({
      user: { id: userId },
    });

    return this.courseRepository.findBy({ instructor: { id: instructor.id } });
  }
}
