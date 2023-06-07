import { Type } from 'class-transformer';
import { IsInt, IsNumber, IsString, Min } from 'class-validator';

export class CreateLessonDto {
  // The data is sent from form data is default string so we need to convert it to integer
  @Type(() => Number)
  @IsInt()
  courseId: number;

  @IsString()
  title: string;

  @IsString()
  content: string;

  @Type(() => Number)
  @IsInt()
  @Min(0)
  durationInMinutes: number;

  @Type(() => Number)
  @IsNumber()
  @Min(0)
  order: number;
}
