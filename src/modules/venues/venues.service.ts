import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';

import { CreateVenueDto } from './dto/create-venue.dto';
import { UpdateVenueDto } from './dto/update-venue.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

import { Venue } from '../venues/entities/venue.entity';
import { validate as isUUID } from 'uuid';

@Injectable()
export class VenuesService {

  private readonly logger = new Logger('VenuesService');

  constructor(

    @InjectRepository(Venue)
    private readonly venueRepository: Repository<Venue>,

    private readonly dataSource: DataSource,

  ) {}

  
  async create(createVenueDto: CreateVenueDto) {
    try {
      const venue = this.venueRepository.create(createVenueDto);
      await this.venueRepository.save(venue);
      return venue;

    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Error en BD!')
    }
  }

  async findAll( paginationDto: PaginationDto ) {
    const { limit = 10, offset = 0 } = paginationDto;
    const venues = await this.venueRepository.find({
      take: limit,
      skip: offset
    })
    return venues.map( ( venue ) => ({
      ...venue,
    }))
  }

  async findOne( term: string ) {

    let venue: Venue;

    if ( isUUID(term) ) {
      venue = await this.venueRepository.findOneBy({ venueid: term });
    } else {
      const queryBuilder = this.venueRepository.createQueryBuilder('ven'); 
      venue = await queryBuilder
        .where('venuename =:venuename', {
          venuename: term,
        })
        .getOne();
    }

    if ( !venue ) 
      throw new NotFoundException(`Product with ${ term } not found`);

    return venue;
  }

  async findOnePlain( term: string ) {
    const { 
       ...rest } = await this.findOne( term );
    return {
      ...rest,
    }
  }

  async update( venueid: string, updateVenueDto: UpdateVenueDto ) {

    const { 
      ...toUpdate } = updateVenueDto; 

    const venue = await this.venueRepository.preload({
      venueid, ...toUpdate 
    });

    if ( !venue ) throw new NotFoundException(`Product with id: ${ venueid } not found`);

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {

      await queryRunner.manager.save( venue );

      await queryRunner.commitTransaction();
      await queryRunner.release();

      return this.findOnePlain( venueid );
      
    } catch (error) {

      await queryRunner.rollbackTransaction();
      await queryRunner.release();
      this.handleDBExceptions(error);

    }

  }

  async remove(venueid: string) {
    const venue = await this.findOne( venueid );
    await this.venueRepository.remove( venue );
    
  }


  private handleDBExceptions( error: any ) {

    if ( error.code === '23505' )
      throw new BadRequestException(error.detail);
    
    this.logger.error(error)
    throw new InternalServerErrorException('Unexpected error, check server logs');

  }
  async deleteAllVenues() {
    const query = this.venueRepository.createQueryBuilder('venue');

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

