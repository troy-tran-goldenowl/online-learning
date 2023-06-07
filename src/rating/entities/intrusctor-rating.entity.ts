import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Instructor } from '../../instructor/entities/instructor.entity';
import { User } from '../../user/entities/user.entity';
import { DatabaseTable } from 'src/constants/table.enum';

@Entity({ name: DatabaseTable.InstructorRating })
export class InstructorRating {
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

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
