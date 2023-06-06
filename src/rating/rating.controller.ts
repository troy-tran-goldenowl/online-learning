import {
  Body,
  Controller,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreateInstructorRatingDto } from './dtos/create-instructor-rating.dto';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { User } from 'src/user/entities/user.entity';
import { RatingService } from './rating.service';
import { InstructorExitsGuard } from './guards/instructor.guard';
import { CourseExitsGuard } from './guards/course.guard';

@UseGuards(JwtAuthGuard)
@Controller('rating')
export class RatingController {
  constructor(private readonly ratingService: RatingService) {}
  @Post('instructor/:id')
  @UseGuards(InstructorExitsGuard)
  rateInstructor(
    @Param('id', ParseIntPipe) instructorId: number,
    @Body() ratingInstructorDto: CreateInstructorRatingDto,
    @CurrentUser() user: User,
  ) {
    return this.ratingService.createInstructorRating(
      instructorId,
      ratingInstructorDto,
      user.id,
    );
  }

  @Post('course/:id')
  @UseGuards(CourseExitsGuard)
  rateCourse(
    @Param('id', ParseIntPipe) courseId: number,
    @Body() ratingInstructorDto: CreateInstructorRatingDto,
    @CurrentUser() user: User,
  ) {
    return this.ratingService.createCourseRating(
      courseId,
      ratingInstructorDto,
      user.id,
    );
  }
}
