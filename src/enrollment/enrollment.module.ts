import { Module } from '@nestjs/common';
import { EnrollmentController } from './enrollment.controller';
import { EnrollmentService } from './enrollment.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Enrollment } from './entities/enrollment.entity';

@Module({
  controllers: [EnrollmentController],
  providers: [EnrollmentService],
  imports: [TypeOrmModule.forFeature([Enrollment])],
})
export class EnrollmentModule {}
