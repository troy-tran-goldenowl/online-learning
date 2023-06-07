import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { EnrollmentService } from 'src/enrollment/enrollment.service';

@Injectable()
export class EnrollmentGuard implements CanActivate {
  constructor(private readonly enrollmentService: EnrollmentService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const courseId = request.params.id;
    const user = request.user;

    // Check if the user is enrolled in the course
    const isEnrolled = await this.enrollmentService.findOne(user.id, courseId);

    if (!isEnrolled) {
      throw new ForbiddenException(
        'User must enrolled this course to access resource',
      );
    }

    return true;
  }
}
