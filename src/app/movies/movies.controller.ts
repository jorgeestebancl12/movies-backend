// Core
import { Get, Param, Controller, HttpStatus, Query } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

// Services
import { MoviesService } from './movies.service';

// Security
import { Auth } from '../auth/decorators';
import { UserRoleEnum } from '../users/constants/user.constant';

// Dtos
import { MovieGetDto } from './dto/movieGet.dto';

@Auth()
@ApiBearerAuth()
@ApiTags('Movies')
@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get()
  @ApiOperation({
    summary: `Permission: ${UserRoleEnum.Admin}, ${UserRoleEnum.Customer}`,
    description: 'Requires permissions',
  })
  // Response documentation decorators
  @ApiResponse({ status: HttpStatus.OK, description: 'Ok' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad request' })
  findAll(@Query() query: MovieGetDto) {
    return this.moviesService.findAll(query);
  }

  @Get(':id')
  @ApiOperation({
    summary: `Permission: ${UserRoleEnum.Admin}, ${UserRoleEnum.Customer}`,
    description: 'Requires permissions',
  })
  // Response documentation decorators
  @ApiResponse({ status: HttpStatus.OK, description: 'Ok' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Not found' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad request' })
  findOne(@Param('id') id: string) {
    return this.moviesService.findOne(+id);
  }

  @Get(':id/recommendations')
  @ApiOperation({
    summary: `Permission: ${UserRoleEnum.Admin}, ${UserRoleEnum.Customer}`,
    description: 'Requires permissions',
  })
  // Response documentation decorators
  @ApiResponse({ status: HttpStatus.OK, description: 'Ok' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Not found' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad request' })
  findRecommendations(@Param('id') id: string) {
    return this.moviesService.findRecommendations(+id);
  }
}
