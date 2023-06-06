import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Course } from '../../course/entities/course.entity';
import { User } from '../../user/entities/user.entity';
import { DatabaseTable } from 'src/constants/table.enum';

@Entity({ name: DatabaseTable.CourseRating })
export class CourseRating {
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

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
