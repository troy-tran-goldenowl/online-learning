import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Instructor } from './entities/instructor.entity';
import { Repository } from 'typeorm';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class InstructorService {
  constructor(
    @InjectRepository(Instructor)
    private readonly instructorRepository: Repository<Instructor>,
    private readonly userService: UserService,
  ) {}

  findOne(id: number): Promise<Instructor> {
    return this.instructorRepository.findOneBy({ id });
  }

  findAll(): Promise<Instructor[]> {
    return this.instructorRepository.find();
  }

  findOneByUserId(userId: number): Promise<Instructor> {
    return this.instructorRepository.findOneBy({ user: { id: userId } });
  }

  async create(user: User): Promise<Instructor> {
    if (await this.findOneByUserId(user.id)) {
      throw new ConflictException('This user is already an instructor');
    }

    const instructor = this.instructorRepository.create();
    instructor.user = user;
    return this.instructorRepository.save(instructor);
  }
}
