import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';

import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

import { Event } from '../events/entities/event.entity';
import { validate as isUUID } from 'uuid';

import { VenuesService } from '../venues/venues.service';
import { CategoriesService } from '../categories/categories.service';
import { DatesService } from '../dates/dates.service';

@Injectable()
export class EventsService {

  private readonly logger = new Logger('EventsService');

  constructor(

    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>,
    private readonly venueService: VenuesService,
    private readonly categoryService: CategoriesService,
    private readonly dateService: DatesService,

    private readonly dataSource: DataSource,

  ) {}

  
  async create(createEventDto: CreateEventDto) {
    try {
      const { venue, cat, date, ...campos } = createEventDto;
      const event = this.eventRepository.create({ ...campos });
      event.venue = await this.venueService.findOne( venue );
      event.cat = await this.categoryService.findOne( cat );
      event.date = await this.dateService.findOne( date );
      await this.eventRepository.save( event );
      return event;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Error en BD!')
    }
  }

  async findAll( paginationDto: PaginationDto ) {
    const { limit = 10, offset = 0 } = paginationDto;
    const events = await this.eventRepository.find({
      take: limit,
      skip: offset
    })
    return events.map( ( event ) => ({
      ...event,
      venue: event.venue.venueid,
      cat: event.cat.catid,
      date: event.date.dateid,
    }))
  }

  async findOne( term: string ) {

    let event: Event;

    if ( isUUID(term) ) {
      event = await this.eventRepository.findOneBy({ eventid: term });
    } else {
      const queryBuilder = this.eventRepository.createQueryBuilder('eve'); 
      event = await queryBuilder
        .where('eventname =:eventname', {
          eventname: term,
        })
        .leftJoinAndSelect('eve.venueid',
        'eveVenues')
        .getOne();
    }

    if ( !event ) 
      throw new NotFoundException(`Product with ${ term } not found`);

    return event;
  }

  async findOnePlain( term: string ) {
    const { 
      venue,
      cat,
      date,
       ...rest } = await this.findOne( term );
    return {
      ...rest,
      venue: venue.venueid,
      cat: cat.catid,
      date: date.dateid,
    }
  }

  async update( eventid: string, updateEventDto: UpdateEventDto ) {

    const { 
      venue,
      cat,
      date,
      ...toUpdate } = updateEventDto; 

    const event = await this.eventRepository.preload({
      eventid, ...toUpdate 
    });

    if ( !event ) throw new NotFoundException(`Product with id: ${ eventid } not found`);

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      if( venue ) {
        event.venue = await this.venueService.findOne( venue );
      } 

      if( cat ) {
        event.cat = await this.categoryService.findOne( cat );
      } 

      if( date ) {
        event.date = await this.dateService.findOne( date );
      }      

      await queryRunner.manager.save( event );

      await queryRunner.commitTransaction();
      await queryRunner.release();

      return this.findOnePlain( eventid );
      
    } catch (error) {

      await queryRunner.rollbackTransaction();
      await queryRunner.release();
      this.handleDBExceptions(error);

    }

  }

  async remove(eventid: string) {
    const event = await this.findOne( eventid );
    await this.eventRepository.remove( event );
    
  }


  private handleDBExceptions( error: any ) {

    if ( error.code === '23505' )
      throw new BadRequestException(error.detail);
    
    this.logger.error(error)
    throw new InternalServerErrorException('Unexpected error, check server logs');

  }
  async deleteAllEvents() {
    const query = this.eventRepository.createQueryBuilder('event');

    try {
      return await query
        .delete()
        .where({})
        .execute();

    } catch (error) {
      this.handleDBExceptions(error);
    }

  }

}
