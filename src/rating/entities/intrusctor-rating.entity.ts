import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Instructor } from '../../instructor/entities/instructor.entity';
import { User } from '../../user/entities/user.entity';
import { DatabaseTable } from '../../constants/table.enum';
import { BaseEntity } from '../../common/entities/base.entity';

@Entity({ name: DatabaseTable.InstructorRating })
export class InstructorRating extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  rating: number;

  @ManyToOne(() => Instructor, (instructor) => instructor.ratings)
  @JoinColumn()
  instructor: Instructor;

  @ManyToOne(() => User, (user) => user.instructorRatings)
  @JoinColumn()
  user: User;
}
