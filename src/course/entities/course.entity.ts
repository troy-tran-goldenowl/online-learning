import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Lesson } from '../../lesson/entities/lesson.entity';
import { Instructor } from '../../instructor/entities/instructor.entity';
import { Enrollment } from '../../enrollment/entities/enrollment.entity';
import { CourseRating } from '../../rating/entities/course-rating.entity';
import { BaseEntity } from '../../common/entities/base.entity';

@Entity()
export class Course extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @ManyToOne(() => Instructor, (instructor) => instructor.courses, {
    eager: true,
  })
  instructor: Instructor;

  @OneToMany(() => Lesson, (lesson) => lesson.course)
  lessons: Lesson[];

  @OneToMany(() => Enrollment, (enrollment) => enrollment.course)
  enrollments: Enrollment[];

  @OneToMany(() => CourseRating, (rating) => rating.course)
  ratings: CourseRating[];
}
