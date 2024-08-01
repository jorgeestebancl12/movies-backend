// Core
import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

// Entity
import { Favorite } from '../entities/favorite.entity';

@Injectable()
export class FavoriteRepository extends Repository<Favorite> {
  // Inject the data source
  constructor(protected dataSource: DataSource) {
    // Call the parent constructor
    super(Favorite, dataSource.createEntityManager());
  }
}
