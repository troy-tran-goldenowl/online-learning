import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Res,
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
import { Response } from 'express';

@Controller('courses')
@UseGuards(JwtAuthGuard)
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Get()
  findAll() {
    return this.courseService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.courseService.findOne(id);
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
