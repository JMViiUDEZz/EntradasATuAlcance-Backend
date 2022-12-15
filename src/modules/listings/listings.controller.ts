import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseUUIDPipe } from '@nestjs/common';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { ListingsService } from './listings.service';
import { CreateListingDto } from './dto/create-listing.dto';
import { UpdateListingDto } from './dto/update-listing.dto';

@Controller('listings')
export class ListingsController {
  constructor(private readonly listingsService: ListingsService) {}

  @Post()
  create(@Body() createListingDto: CreateListingDto) {
    return this.listingsService.create(createListingDto);
  }

  @Get()
  findAll( @Query() paginationDto:PaginationDto ) {
    return this.listingsService.findAll( paginationDto );
  }

  @Get(':listid')
  findOne(@Param('listid') listid: string) {
    return this.listingsService.findOnePlain(listid);
  }

  @Patch(':listid')
  update(@Param('listid', ParseUUIDPipe ) listid: string, @Body() updateListingDto: UpdateListingDto) {
    return this.listingsService.update(listid, updateListingDto);
  }

  @Delete(':listid')
  remove(@Param('listid', ParseUUIDPipe ) listid: string) {
    return this.listingsService.remove(listid);
  }
}
