import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';

import { CreateListingDto } from './dto/create-listing.dto';
import { UpdateListingDto } from './dto/update-listing.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

import { Listing } from '../listings/entities/listing.entity';

import { AuthService } from '../auth/auth.service';
import { EventsService } from '../events/events.service';
import { DatesService } from '../dates/dates.service';
@Injectable()
export class ListingsService {

  private readonly logger = new Logger('CategoriesService');

  constructor(

    @InjectRepository(Listing)
    private readonly listingRepository: Repository<Listing>,
    private readonly authService: AuthService,
    private readonly eventService: EventsService,
    private readonly dateService: DatesService,
    private readonly dataSource: DataSource,

  ) {}

  
  async create(createListingDto: CreateListingDto) {
    try {
      const { seller, event, date, ...campos } = createListingDto;
      const listing = this.listingRepository.create({ ...campos });
      listing.seller = await this.authService.findOne( seller );
      listing.event = await this.eventService.findOne( event );
      listing.date = await this.dateService.findOne( date );
      await this.listingRepository.save( listing );
      return listing;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Error en BD!')
    }
  }

  async findAll( paginationDto: PaginationDto ) {
    const { limit = 10, offset = 0 } = paginationDto;
    const listings = await this.listingRepository.find({
      take: limit,
      skip: offset
    })
    return listings.map( ( listing ) => ({
      ...listing,
      // seller: listing.seller.userid,
      // event: listing.event.eventid,
      // date: listing.date.dateid,
    }))
  }

  async findOne( listid: string ) {

    let listing: Listing;

    listing = await this.listingRepository.findOneBy({ listid });

    if ( !listing ) 
      throw new NotFoundException(`Product with ${ listid } not found`);

    return listing;
  }

  async findOnePlain( listid: string ) {
    const { 
      seller,
      event,
      date,
       ...rest } = await this.findOne( listid );
    return {
      ...rest,
      seller : seller.userid,
      event : event.eventid,
      date : date.dateid,
    }
  }

  async update( listid: string, updateListingDto: UpdateListingDto ) {

    const { 
      seller,
      event,
      date,
      ...toUpdate } = updateListingDto; 

    const listing = await this.listingRepository.preload({
      listid, ...toUpdate 
    });

    if ( !listing ) throw new NotFoundException(`Product with id: ${ listid } not found`);

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      if( seller ) {
        listing.seller = await this.authService.findOne( seller );
      } 


      if( event ) {
        listing.event = await this.eventService.findOne( event );
      } 

      if( date ) {
        listing.date = await this.dateService.findOne( date );
      } 

      await queryRunner.manager.save( listing );

      await queryRunner.commitTransaction();
      await queryRunner.release();

      return this.findOnePlain( listid );
      
    } catch (error) {

      await queryRunner.rollbackTransaction();
      await queryRunner.release();
      this.handleDBExceptions(error);

    }

  }

  async remove(listid: string) {
    const listing = await this.findOne( listid );
    await this.listingRepository.remove( listing );
    
  }


  private handleDBExceptions( error: any ) {

    if ( error.code === '23505' )
      throw new BadRequestException(error.detail);
    
    this.logger.error(error)
    throw new InternalServerErrorException('Unexpected error, check server logs');

  }
  async deleteAllListings() {
    const query = this.listingRepository.createQueryBuilder('listing');

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
