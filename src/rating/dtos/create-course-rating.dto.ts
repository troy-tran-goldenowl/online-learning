import { IsOptional, IsString, Max, Min, IsInt } from 'class-validator';

export class CreateCourseRatingDto {
  @IsInt()
  @Min(1)
  @Max(5)
  rating: number;

  @IsString()
  @IsOptional()
  comment: string;
}
