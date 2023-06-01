import { Controller, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { InstructorGuard } from 'src/common/guards/instructor.guard';

@Controller('courses')
@UseGuards(JwtAuthGuard)
export class CourseController {
  @Post()
  @UseGuards(InstructorGuard)
  createCourse() {
    return 'hello';
  }
}
