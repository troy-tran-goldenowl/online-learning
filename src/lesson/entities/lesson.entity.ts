import { BaseEntity } from '../../common/entities/base.entity';
import { Course } from '../../course/entities/course.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Lesson extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  content: string;

  @Column({ name: 'duration_in_minutes' })
  durationInMinutes: number;

  @Column()
  order: number;

  @Column({ name: 'image_url', nullable: true })
  imageUrl: string;

  @Column({ name: 'video_url', nullable: true })
  videoUrl: string;

  @ManyToOne(() => Course, (course) => course.lessons, { eager: true })
  course: Course;
}
