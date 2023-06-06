import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CreateLessonDto } from './dtos/create-lesson.dto';
import { LessonService } from './lesson.service';
import { LessonFilesType } from 'src/types/create-lesson-file.type';
import { UploadLessonFilesInterceptor } from './interceptors/upload-lesson-files.interceptor';
import { InstructorGuard } from 'src/common/guards/instructor.guard';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UpdateLessonDto } from './dtos/update-lession.dto';
import { LessonOwnerGuard } from './guards/lesson-owner.guard';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { User } from 'src/user/entities/user.entity';
import { EnrollmentGuard } from 'src/common/guards/enrollment.guard';

@Controller('lesson')
@UseGuards(JwtAuthGuard, InstructorGuard)
export class LessonController {
  constructor(private readonly lessonService: LessonService) {}

  @UseGuards(EnrollmentGuard)
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.lessonService.findOne(id);
  }

  @Get('/courses/:id')
  @UseGuards(EnrollmentGuard)
  findLessonsByCourseId(
    @Param('id', ParseIntPipe) courseId: number,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10,
    @Query('title', new DefaultValuePipe('')) title: string,
  ) {
    return this.lessonService.findLessonsByCourseId(
      courseId,
      page,
      limit,
      title,
    );
  }

  @Post()
  @UseInterceptors(UploadLessonFilesInterceptor)
  createLesson(
    @Body() createLessonDto: CreateLessonDto,
    @UploadedFiles()
    files: LessonFilesType,
    @CurrentUser() user: User,
  ) {
    return this.lessonService.create(createLessonDto, files, user);
  }

  @Patch(':id')
  @UseInterceptors(UploadLessonFilesInterceptor)
  @UseGuards(LessonOwnerGuard)
  updateLesson(
    @Body() updateLessonDto: UpdateLessonDto,
    @UploadedFiles()
    files: LessonFilesType,
    @Param('id', ParseIntPipe) lessonId: number,
  ) {
    return this.lessonService.update({
      updateLessonDto,
      files,
      lessonId,
    });
  }

  @Delete(':id')
  @UseGuards(LessonOwnerGuard)
  deleteLesson(@Param('id', ParseIntPipe) id: number) {
    return this.lessonService.delete(id);
  }
}
