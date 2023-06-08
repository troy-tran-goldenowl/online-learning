import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';

// Modules
import { DatabaseModule } from 'src/database/database.module';
import { UserModule } from 'src/user/user.module';
import { AuthModule } from 'src/auth/auth.module';
import { InstructorModule } from 'src/instructor/instructor.module';
import { CourseModule } from 'src/course/course.module';
import { LessonModule } from 'src/lesson/lesson.module';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';
import { EnrollmentModule } from 'src/enrollment/enrollment.module';
import { RatingModule } from 'src/rating/rating.module';
import { UserEnrollmentModule } from 'src/user-enrollment/user-enrollment.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    DatabaseModule,
    UserModule,
    AuthModule,
    InstructorModule,
    CourseModule,
    LessonModule,
    CloudinaryModule,
    EnrollmentModule,
    RatingModule,
    UserEnrollmentModule,
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
  ],
})
export class AppModule {}
