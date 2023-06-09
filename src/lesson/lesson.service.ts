import {
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Lesson } from './entities/lesson.entity';
import { Repository } from 'typeorm';
import { CreateLessonDto } from './dtos/create-lesson.dto';
import { CourseFinderService } from 'src/course/course-finder.service';
import { LessonFilesType } from 'src/types/create-lesson-file.type';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { CloudinaryResponse } from 'src/cloudinary/cloudinary-response';
import { User } from 'src/user/entities/user.entity';
import { UpdateLessonDto } from './dtos/update-lession.dto';
import { Pagination, paginate } from 'nestjs-typeorm-paginate';

@Injectable()
export class LessonService {
  constructor(
    @InjectRepository(Lesson)
    private readonly lessonRepository: Repository<Lesson>,
    private readonly courseFinderService: CourseFinderService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  async findOne(id: number): Promise<Lesson> {
    const lesson = await this.lessonRepository.findOneBy({ id });
    if (!lesson) {
      throw new NotFoundException('Lesson not found');
    }

    return lesson;
  }

  findLessonsByCourseId(
    courseId: number,
    page: number,
    limit: number,
    title,
  ): Promise<Pagination<Lesson>> {
    const queryBuilder = this.lessonRepository
      .createQueryBuilder('lesson')
      .where('lesson.course = :courseId', { courseId })
      .andWhere('lesson.title like :title', { title: `%${title}%` });

    return paginate(queryBuilder, { page, limit });
  }

  async create(
    createLessonDto: CreateLessonDto,
    files: LessonFilesType,
    user: User,
  ): Promise<Lesson> {
    const course = await this.courseFinderService.findCourseById(
      createLessonDto.courseId,
    );

    if (course.instructor?.user?.id !== user.id) {
      throw new ForbiddenException(
        'Only course owner can access this resource',
      );
    }

    const lesson = this.lessonRepository.create(createLessonDto);

    const { image, video } = await this.updateFilesToCloudinary(files, user.id);
    lesson.imageUrl = image?.url;
    lesson.videoUrl = video?.url;
    lesson.course = course;

    return this.lessonRepository.save(lesson);
  }

  private async updateFilesToCloudinary(
    files: LessonFilesType,
    userId: number,
  ): Promise<{
    video?: CloudinaryResponse;
    image?: CloudinaryResponse;
  }> {
    try {
      const uploadPromises: Promise<CloudinaryResponse>[] = [];

      if (files.image?.length > 0) {
        uploadPromises.push(
          this.cloudinaryService.uploadFile(files.image[0], userId),
        );
      }
      if (files.video?.length > 0) {
        uploadPromises.push(
          this.cloudinaryService.uploadFile(files.video[0], userId),
        );
      }

      const [image, video] = await Promise.all(uploadPromises);
      return { image, video };
    } catch (error) {
      throw new HttpException(
        'Error uploading files',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update({
    updateLessonDto,
    files,
    lessonId,
    userId,
  }: {
    updateLessonDto: UpdateLessonDto;
    files: LessonFilesType;
    lessonId: number;
    userId: number;
  }): Promise<Lesson> {
    const lesson = await this.findOne(lessonId);

    const { image, video } = await this.updateFilesToCloudinary(files, userId);
    if (image) {
      lesson.imageUrl = image?.url;
    }
    if (video) {
      lesson.videoUrl = video?.url;
    }

    Object.assign(lesson, updateLessonDto);
    return this.lessonRepository.save(lesson);
  }

  async delete(id: number): Promise<Lesson> {
    const lesson = await this.findOne(id);
    return this.lessonRepository.remove(lesson);
  }
}
