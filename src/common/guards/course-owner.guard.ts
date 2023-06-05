import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { CourseService } from 'src/course/course.service';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class CourseOwnerGuard implements CanActivate {
  constructor(private readonly courseService: CourseService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user: User = request.user;
    const params: { id: number } = request.params;
    const course = await this.courseService.findOne(params.id);
    if (!course) {
      throw new NotFoundException('Course not found');
    }

    if (course.instructor.user.id !== user.id) {
      throw new ForbiddenException(
        'Only course owner can access this resource',
      );
    }
    return true;
  }
}
