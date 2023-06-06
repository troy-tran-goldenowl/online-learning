import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { CourseService } from 'src/course/course.service';

@Injectable()
export class CourseExitsGuard implements CanActivate {
  constructor(private readonly courseService: CourseService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const id = request.params.id;
    const course = await this.courseService.findOne(id);
    if (!course) {
      throw new ForbiddenException('Course does not exits');
    }

    return true;
  }
}
