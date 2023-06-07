import { Expose } from 'class-transformer';
import { CreateDateColumn, UpdateDateColumn } from 'typeorm';

export class BaseEntity {
  @Expose({ name: 'createdAt' })
  @CreateDateColumn()
  created_at: Date;

  @Expose({ name: 'updatedAt' })
  @UpdateDateColumn()
  updated_at: Date;
}
