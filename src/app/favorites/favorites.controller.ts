// Core
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import {
  Get,
  Post,
  Body,
  Param,
  Delete,
  Controller,
  HttpStatus,
  Query,
} from '@nestjs/common';

// Services
import { FavoritesService } from './favorites.service';

// Dto
import { FavoriteGetDto } from './dto/favoriteGet.dto';
import { FavoriteCreateDto } from './dto/favoriteCreate.dto';

// Constants
import { UserRoleEnum } from '../users/constants/user.constant';

// Security
import { Auth, User } from '../auth/decorators';
import { AuthType } from '../auth/types/auth.type';

@Auth()
@ApiBearerAuth()
@ApiTags('Favorites')
@Controller('favorites')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Post()
  @ApiOperation({
    summary: `Permission: ${UserRoleEnum.Admin}, ${UserRoleEnum.Customer}`,
    description: 'Requires permissions',
  })
  // Response documentation decorators
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Created' })
  @ApiResponse({ status: HttpStatus.CONFLICT, description: 'Conflict' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad request' })
  create(@Body() favoriteCreateDto: FavoriteCreateDto, @User() auth: AuthType) {
    return this.favoritesService.create(favoriteCreateDto, auth);
  }

  @Get()
  @ApiOperation({
    summary: `Permission: ${UserRoleEnum.Admin}, ${UserRoleEnum.Customer}`,
    description: 'Requires permissions',
  })
  // Response documentation decorators
  @ApiResponse({ status: HttpStatus.OK, description: 'Ok' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad request' })
  findAll(@Query() query: FavoriteGetDto, @User() auth: AuthType) {
    return this.favoritesService.findAll(query, auth);
  }

  @Delete(':id')
  @ApiOperation({
    summary: `Permission: ${UserRoleEnum.Admin}, ${UserRoleEnum.Customer}`,
    description: 'Requires permissions',
  })
  // Response documentation decorators
  @ApiResponse({ status: HttpStatus.OK, description: 'Ok' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Not found' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad request' })
  remove(@Param('id') id: string, @User() auth: AuthType) {
    return this.favoritesService.remove(+id, auth);
  }
}
