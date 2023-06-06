import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { InstructorService } from 'src/instructor/instructor.service';

@Injectable()
export class InstructorExitsGuard implements CanActivate {
  constructor(private readonly instructorService: InstructorService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const id = request.params.id;
    const instructor = await this.instructorService.findOne(id);
    if (!instructor) {
      throw new ForbiddenException('Instructor does not exits');
    }

    return true;
  }
}
