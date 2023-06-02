import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { CourseService } from 'src/course/course.service';
import { InstructorService } from 'src/instructor/instructor.service';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class CourseOwnerGuard implements CanActivate {
  constructor(
    private readonly instructorService: InstructorService,
    private readonly courseService: CourseService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user: User = request.user;
    const params: { id: number } = request.params;
    const course = await this.courseService.findOne(params.id);
    if (course) {
      return course.instructor.user.id === user.id;
    }
    return false;
  }
}
