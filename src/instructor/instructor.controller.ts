import {
  Controller,
  DefaultValuePipe,
  Get,
  ParseIntPipe,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { InstructorService } from './instructor.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { User } from 'src/user/entities/user.entity';
import { InstructorGuard } from 'src/common/guards/instructor.guard';
import { CourseInstructorService } from 'src/course-instructor/course-instructor.service';

@Controller('instructor')
@UseGuards(JwtAuthGuard)
export class InstructorController {
  constructor(
    private readonly instructorService: InstructorService,
    private readonly courseInstructorService: CourseInstructorService,
  ) {}

  @Post('register')
  registerInstructor(@CurrentUser() user: User) {
    return this.instructorService.create(user);
  }

  @UseGuards(InstructorGuard)
  @Get('courses')
  getAllCourses(
    @CurrentUser() user: User,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10,
  ) {
    return this.courseInstructorService.findAllCourseByUserId(
      user.id,
      page,
      limit,
    );
  }
}
