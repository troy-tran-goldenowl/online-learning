import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Course } from '../../course/entities/course.entity';
import { InstructorRating } from '../../rating/entities/intrusctor-rating.entity';

@Entity()
export class Instructor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: 0 })
  rating: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToOne(() => User, { eager: true })
  @JoinColumn()
  user: User;

  @OneToMany(() => Course, (course) => course.instructor)
  courses: Course[];

  @OneToMany(() => InstructorRating, (rating) => rating.instructor)
  ratings: InstructorRating[];
}
