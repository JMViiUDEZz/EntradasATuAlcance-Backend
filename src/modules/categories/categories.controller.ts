import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseUUIDPipe } from '@nestjs/common';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.create(createCategoryDto);
  }

  @Get()
  findAll( @Query() paginationDto:PaginationDto ) {
    return this.categoriesService.findAll( paginationDto );
  }

  @Get(':term')
  findOne(@Param('term') term: string) {
    return this.categoriesService.findOnePlain(term);
  }

  @Patch(':catid')
  update(@Param('catid', ParseUUIDPipe ) catid: string, @Body() updateCategoryDto: UpdateCategoryDto) {
    return this.categoriesService.update(catid, updateCategoryDto);
  }

  @Delete(':catid')
  remove(@Param('catid', ParseUUIDPipe ) catid: string) {
    return this.categoriesService.remove(catid);
  }
}
