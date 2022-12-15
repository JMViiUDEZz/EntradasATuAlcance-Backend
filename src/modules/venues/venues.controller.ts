import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseUUIDPipe } from '@nestjs/common';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { VenuesService } from './venues.service';
import { CreateVenueDto } from './dto/create-venue.dto';
import { UpdateVenueDto } from './dto/update-venue.dto';

@Controller('venues')
export class VenuesController {
  constructor(private readonly venuesService: VenuesService) {}

  @Post()
  create(@Body() createVenueDto: CreateVenueDto) {
    return this.venuesService.create(createVenueDto);
  }

  @Get()
  findAll( @Query() paginationDto:PaginationDto ) {
    return this.venuesService.findAll( paginationDto );
  }

  @Get(':term')
  findOne(@Param('term') term: string) {
    return this.venuesService.findOne(term);
  }

  @Patch(':venueid')
  update(@Param('venueid', ParseUUIDPipe ) venueid: string, @Body() updateVenueDto: UpdateVenueDto) {
    return this.venuesService.update(venueid, updateVenueDto);
  }

  @Delete(':venueid')
  remove(@Param('venueid', ParseUUIDPipe ) venueid: string) {
    return this.venuesService.remove(venueid);
  }
}
