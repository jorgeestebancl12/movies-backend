// Core
import {
  Column,
  Entity,
  OneToMany,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

// Entities
import { Favorite } from '../../favorites/entities/favorite.entity';
import { Reating } from '../../ratings/entities/reating.entity';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 200, nullable: false })
  fullname: string;

  @Column({ length: 130, nullable: false, unique: true })
  email: string;

  @Column({ length: 255, nullable: false })
  password: string;

  @Column({ default: false })
  confirm_email: boolean;

  @Column({ length: 20, nullable: false })
  role: string;

  @Column({ default: true })
  status: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => Favorite, (entity: Favorite) => entity.user)
  @JoinColumn({ name: 'id', referencedColumnName: 'user_id' })
  favorities: Favorite[];

  @OneToMany(() => Reating, (entity: Reating) => entity.user)
  @JoinColumn({ name: 'id', referencedColumnName: 'user_id' })
  reatings: Reating[];
}
