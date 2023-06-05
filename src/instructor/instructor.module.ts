import { Module } from '@nestjs/common';
import { InstructorController } from './instructor.controller';
import { InstructorService } from './instructor.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Instructor } from './entities/instructor.entity';
import { UserModule } from 'src/user/user.module';
import { CourseInstructorModule } from 'src/course-instructor/course-instructor.module';

@Module({
  controllers: [InstructorController],
  providers: [InstructorService],
  imports: [
    TypeOrmModule.forFeature([Instructor]),
    UserModule,
    CourseInstructorModule,
  ],
  exports: [InstructorService],
})
export class InstructorModule {}
