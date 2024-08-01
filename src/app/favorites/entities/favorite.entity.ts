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

@Entity({ name: 'favorities' })
@Index(['movie_code', 'user_id'], { unique: true })
export class Favorite {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  movie_code: number;

  @Column({ type: 'uuid', nullable: false })
  user_id: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => User, (entity: User) => entity.favorities)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: User;
}
