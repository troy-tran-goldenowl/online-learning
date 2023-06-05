import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Course } from './entities/course.entity';
import { Repository } from 'typeorm';
import { CreateCourseDto } from './dtos/create-course.dto';
import { InstructorService } from 'src/instructor/instructor.service';
import { UpdateCourseDto } from './dtos/update-course.dto';

@Injectable()
export class CourseService {
  constructor(
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,
    private readonly instructorService: InstructorService,
  ) {}

  findAll(): Promise<Course[]> {
    return this.courseRepository.find();
  }

  findOne(id: number): Promise<Course> {
    return this.courseRepository.findOneBy({ id });
  }

  async create(courseDto: CreateCourseDto, userId: number): Promise<Course> {
    const instructor = await this.instructorService.findOneByUserId(userId);
    const course = this.courseRepository.create(courseDto);

    course.instructor = instructor;
    return this.courseRepository.save(course);
  }

  async update(
    updateCourseDto: UpdateCourseDto,
    courseId: number,
  ): Promise<Course> {
    const course = await this.findOne(courseId);
    if (!course) {
      throw new NotFoundException('Course not found');
    }
    Object.assign(course, updateCourseDto);
    return this.courseRepository.save(course);
  }

  async delete(courseId) {
    const course = await this.findOne(courseId);
    if (!course) {
      throw new NotFoundException('Course not found');
    }
    return this.courseRepository.remove(course);
  }
}
