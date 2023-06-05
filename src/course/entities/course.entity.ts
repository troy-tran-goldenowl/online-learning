import { Lesson } from '../../lesson/entities/lesson.entity';
import { Instructor } from '../../instructor/entities/instructor.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Course {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => Instructor, (instructor) => instructor.courses, {
    eager: true,
  })
  instructor: Instructor;

  @OneToMany(() => Lesson, (lesson) => lesson.course)
  lessons: Lesson[];
}
