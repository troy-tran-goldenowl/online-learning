import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { InstructorService } from 'src/instructor/instructor.service';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class InstructorGuard implements CanActivate {
  constructor(private readonly instructorService: InstructorService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user: User = request.user;
    const instructor = await this.instructorService.findOneByUserId(user.id);
    return !!instructor;
  }
}
