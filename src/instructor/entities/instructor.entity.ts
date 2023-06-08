import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Course } from '../../course/entities/course.entity';
import { InstructorRating } from '../../rating/entities/intrusctor-rating.entity';
import { BaseEntity } from '../../common/entities/base.entity';

@Entity()
export class Instructor extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: 0 })
  rating: number;

  @OneToOne(() => User, { eager: true })
  @JoinColumn()
  user: User;

  @OneToMany(() => Course, (course) => course.instructor)
  courses: Course[];

  @OneToMany(() => InstructorRating, (rating) => rating.instructor)
  ratings: InstructorRating[];
}
