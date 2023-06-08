import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Course } from '../../course/entities/course.entity';
import { User } from '../../user/entities/user.entity';
import { DatabaseTable } from '../../constants/table.enum';
import { BaseEntity } from '../../common/entities/base.entity';

@Entity({ name: DatabaseTable.CourseRating })
export class CourseRating extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  rating: number;

  @Column({ nullable: true })
  comment: string;

  @ManyToOne(() => Course, (course) => course.ratings)
  @JoinColumn()
  course: Course;

  @ManyToOne(() => User, (user) => user.courseRatings)
  @JoinColumn()
  user: User;
}
