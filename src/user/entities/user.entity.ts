import { Exclude } from 'class-transformer';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BeforeInsert,
  OneToMany,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Enrollment } from '../../enrollment/entities/enrollment.entity';
import { CourseRating } from '../../rating/entities/course-rating.entity';
import { InstructorRating } from '../../rating/entities/intrusctor-rating.entity';
import { BaseEntity } from '../../common/entities/base.entity';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  @Exclude()
  password: string;

  @OneToMany(() => Enrollment, (enrollment) => enrollment.user)
  enrollments: Enrollment[];

  @OneToMany(() => CourseRating, (rating) => rating.user)
  courseRatings: CourseRating[];

  @OneToMany(() => InstructorRating, (rating) => rating.user)
  instructorRatings: InstructorRating[];

  @BeforeInsert()
  async hashPassword() {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(this.password, saltRounds);
    this.password = hashedPassword;
  }
}
