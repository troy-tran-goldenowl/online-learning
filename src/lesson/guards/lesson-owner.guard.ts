import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { User } from 'src/user/entities/user.entity';
import { LessonService } from '../lesson.service';

@Injectable()
export class LessonOwnerGuard implements CanActivate {
  constructor(private readonly lessonService: LessonService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user: User = request.user;
    const params: { id: number } = request.params;
    const lesson = await this.lessonService.findOne(params.id);

    if (!lesson) {
      throw new NotFoundException('Lesson not found');
    }

    if (lesson.course?.instructor?.user?.id !== user.id) {
      throw new ForbiddenException(
        'Only lesson owner can access this resource',
      );
    }
    return true;
  }
}
