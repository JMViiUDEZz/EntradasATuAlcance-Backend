import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseUUIDPipe } from '@nestjs/common';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { DatesService } from './dates.service';
import { CreateDateDto } from './dto/create-date.dto';
import { UpdateDateDto } from './dto/update-date.dto';

@Controller('dates')
export class DatesController {
  constructor(private readonly datesService: DatesService) {}

  @Post()
  create(@Body() createDateDto: CreateDateDto) {
    return this.datesService.create(createDateDto);
  }

  @Get()
  findAll( @Query() paginationDto:PaginationDto ) {
    return this.datesService.findAll( paginationDto );
  }

  @Get(':dateid')
  findOne(@Param('dateid') dateid: string) {
    return this.datesService.findOnePlain(dateid);
  }

  @Patch(':dateid')
  update(@Param('dateid', ParseUUIDPipe ) dateid: string, @Body() updateDateDto: UpdateDateDto) {
    return this.datesService.update(dateid, updateDateDto);
  }

  @Delete(':dateid')
  remove(@Param('dateid', ParseUUIDPipe ) dateid: string) {
    return this.datesService.remove(dateid);
  }
}
