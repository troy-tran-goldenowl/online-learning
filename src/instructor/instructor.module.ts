import { Module } from '@nestjs/common';
import { InstructorController } from './instructor.controller';
import { InstructorService } from './instructor.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Instructor } from './entities/instructor.entity';
import { UserModule } from 'src/user/user.module';

@Module({
  controllers: [InstructorController],
  providers: [InstructorService],
  imports: [TypeOrmModule.forFeature([Instructor]), UserModule],
})
export class InstructorModule {}
