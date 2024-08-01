// Core
import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

// Entity
import { User } from '../entities/user.entity';

@Injectable()
export class UserRepository extends Repository<User> {
  // Inject the data source
  constructor(protected dataSource: DataSource) {
    // Call the parent constructor
    super(User, dataSource.createEntityManager());
  }
}
