import { IsInt, IsNumber, IsString, Min } from 'class-validator';

export class CreateLessonDto {
  @IsInt()
  courseId: number;

  @IsString()
  title: string;

  @IsString()
  content: string;

  @IsInt()
  @Min(0)
  durationInMinutes: number;

  @IsNumber()
  @Min(0)
  order: number;
}
