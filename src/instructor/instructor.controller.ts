import { Controller, Get, Inject, Post, UseGuards } from '@nestjs/common';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { InstructorService } from './instructor.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { User } from 'src/user/entities/user.entity';
import { InstructorGuard } from 'src/common/guards/instructor.guard';
import { CourseService } from 'src/course/course.service';

@Controller('instructor')
@UseGuards(JwtAuthGuard)
export class InstructorController {
  constructor(
    private readonly instructorService: InstructorService,
    private readonly courseService: CourseService,
  ) {}

  @Post('register')
  registerInstructor(@CurrentUser() user: User) {
    return this.instructorService.create(user);
  }

  @UseGuards(InstructorGuard)
  @Get('courses')
  getAllCourses(@CurrentUser() user: User) {
    return this.courseService.findAllByUserId(user.id);
  }
}
