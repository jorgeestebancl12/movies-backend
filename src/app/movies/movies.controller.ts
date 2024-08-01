// Core
import { Get, Param, Controller, HttpStatus, Query } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

// Services
import { MoviesService } from './movies.service';

// Dtos
import { MovieGetDto } from './dto/movieGet.dto';

@ApiTags('Movies')
@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get()
  // Response documentation decorators
  @ApiResponse({ status: HttpStatus.OK, description: 'Ok' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad request' })
  findAll(@Query() query: MovieGetDto) {
    return this.moviesService.findAll(query);
  }

  @Get(':id')
  // Response documentation decorators
  @ApiResponse({ status: HttpStatus.OK, description: 'Ok' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Not found' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad request' })
  findOne(@Param('id') id: string) {
    return this.moviesService.findOne(+id);
  }

  @Get(':id/recommendations')
  // Response documentation decorators
  @ApiResponse({ status: HttpStatus.OK, description: 'Ok' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Not found' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad request' })
  findRecommendations(@Param('id') id: string) {
    return this.moviesService.findRecommendations(+id);
  }
}
