import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { InstructorGuard } from 'src/common/guards/instructor.guard';
import { CreateCourseDto } from './dtos/create-course.dto';
import { CourseService } from './course.service';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { User } from 'src/user/entities/user.entity';
import { UpdateCourseDto } from './dtos/update-course.dto';
import { CourseOwnerGuard } from 'src/common/guards/course-owner.guard';

@Controller('courses')
@UseGuards(JwtAuthGuard)
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Get()
  findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10,
    @Query('title', new DefaultValuePipe('')) title: string,
  ) {
    return this.courseService.findAll({ page, limit, title });
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const course = await this.courseService.findOne(id);
    if (!course) {
      throw new NotFoundException('Course not found');
    }
    return course;
  }

  @Post()
  @UseGuards(InstructorGuard)
  createCourse(
    @Body() createCourseDto: CreateCourseDto,
    @CurrentUser() user: User,
  ) {
    return this.courseService.create(createCourseDto, user.id);
  }

  @Patch(':id')
  @UseGuards(InstructorGuard, CourseOwnerGuard)
  updateCourse(
    @Body() updateCourseDto: UpdateCourseDto,
    @Param('id', ParseIntPipe) courseId: number,
  ) {
    return this.courseService.update(updateCourseDto, courseId);
  }

  @Delete(':id')
  @UseGuards(InstructorGuard, CourseOwnerGuard)
  async deleteCourse(@Param('id', ParseIntPipe) courseId: number) {
    return this.courseService.delete(courseId);
  }
}
