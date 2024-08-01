// Core
import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

// Entity
import { Reating } from '../entities/reating.entity';

@Injectable()
export class ReatingRepository extends Repository<Reating> {
  // Inject the data source
  constructor(protected dataSource: DataSource) {
    // Call the parent constructor
    super(Reating, dataSource.createEntityManager());
  }
}
