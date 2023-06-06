import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Enrollment } from './entities/enrollment.entity';
import { Repository } from 'typeorm';
import { CreateEnrollmentDto } from './dtos/create-enrollment.dto';
import { CourseService } from 'src/course/course.service';

@Injectable()
export class EnrollmentService {
  constructor(
    @InjectRepository(Enrollment)
    private readonly enrollmentRepository: Repository<Enrollment>,
    private readonly courseService: CourseService,
  ) {}

  findOne(userId: number, courseId: number) {
    return this.enrollmentRepository.findOneBy({
      user: { id: userId },
      course: { id: courseId },
    });
  }

  async create(createEnrollmentDto: CreateEnrollmentDto, userId: number) {
    const course = await this.courseService.findOne(
      createEnrollmentDto.courseId,
    );

    if (!course) {
      throw new NotFoundException('Course not found');
    }

    const isExits = await this.findOne(userId, createEnrollmentDto.courseId);
    if (isExits) {
      throw new ConflictException('User is already enrolled');
    }

    const enrollment = this.enrollmentRepository.create({
      user: { id: userId },
      course: { id: createEnrollmentDto.courseId },
    });

    return this.enrollmentRepository.save(enrollment);
  }
}
