import {
  Index,
  Column,
  Entity,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { User } from '../../users/entities/user.entity';

@Entity({ name: 'reatings' })
@Index(['movie_code', 'user_id'], { unique: true })
export class Reating {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  movie_code: number;

  @Column({ nullable: false })
  reating: number;

  @Column({ type: 'uuid', nullable: false })
  user_id: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => User, (entity: User) => entity.reatings)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: User;
}
