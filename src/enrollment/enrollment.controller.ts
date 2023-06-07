import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { EnrollmentService } from './enrollment.service';
import { CreateEnrollmentDto } from './dtos/create-enrollment.dto';
import { User } from 'src/user/entities/user.entity';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('enrollment')
@UseGuards(JwtAuthGuard)
export class EnrollmentController {
  constructor(private readonly enrollmentService: EnrollmentService) {}

  @Post()
  createEnrollment(
    @Body() createEnrollmentDto: CreateEnrollmentDto,
    @CurrentUser() user: User,
  ) {
    return this.enrollmentService.create(createEnrollmentDto, user.id);
  }
}
