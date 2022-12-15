import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseUUIDPipe } from '@nestjs/common';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Post()
  create(@Body() createEventDto: CreateEventDto) {
    return this.eventsService.create(createEventDto);
  }

  @Get()
  findAll( @Query() paginationDto:PaginationDto ) {
    return this.eventsService.findAll( paginationDto );
  }

  @Get(':term')
  findOne(@Param('term') term: string) {
    return this.eventsService.findOnePlain(term);
  }

  @Patch(':eventid')
  update(@Param('eventid', ParseUUIDPipe ) eventid: string, @Body() updateEventDto: UpdateEventDto) {
    return this.eventsService.update(eventid, updateEventDto);
  }

  @Delete(':eventid')
  remove(@Param('eventid', ParseUUIDPipe ) eventid: string) {
    return this.eventsService.remove(eventid);
  }
}
