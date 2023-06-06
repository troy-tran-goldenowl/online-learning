import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Enrollment } from './entities/enrollment.entity';
import { Repository } from 'typeorm';
import { CreateEnrollmentDto } from './dtos/create-enrollment.dto';

@Injectable()
export class EnrollmentService {
  constructor(
    @InjectRepository(Enrollment)
    private readonly enrollmentRepository: Repository<Enrollment>,
  ) {}

  findOne(userId: number, courseId: number) {
    return this.enrollmentRepository.findOneBy({
      user: { id: userId },
      course: { id: courseId },
    });
  }

  async create(createEnrollmentDto: CreateEnrollmentDto, userId: number) {
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
