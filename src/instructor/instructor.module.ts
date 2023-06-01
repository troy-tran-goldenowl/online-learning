import { Module, forwardRef } from '@nestjs/common';
import { InstructorController } from './instructor.controller';
import { InstructorService } from './instructor.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Instructor } from './entities/instructor.entity';
import { UserModule } from 'src/user/user.module';
import { CourseModule } from 'src/course/course.module';

@Module({
  controllers: [InstructorController],
  providers: [InstructorService],
  imports: [
    TypeOrmModule.forFeature([Instructor]),
    UserModule,
    forwardRef(() => CourseModule),
  ],
  exports: [InstructorService],
})
export class InstructorModule {}
