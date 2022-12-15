import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';

import { CreateDateDto } from './dto/create-date.dto';
import { UpdateDateDto } from './dto/update-date.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

import { Date } from '../dates/entities/date.entity';

@Injectable()
export class DatesService {

  private readonly logger = new Logger('DatesService');

  constructor(

    @InjectRepository(Date)
    private readonly dateRepository: Repository<Date>,

    private readonly dataSource: DataSource,

  ) {}

  
  async create(createDateDto: CreateDateDto) {
    try {
      const date = this.dateRepository.create(createDateDto);
      await this.dateRepository.save(date);
      return date;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Error en BD!')
    }
  }

  async findAll( paginationDto: PaginationDto ) {
    const { limit = 10, offset = 0 } = paginationDto;
    const date = await this.dateRepository.find({
      take: limit,
      skip: offset
    })
    return date.map( ( date ) => ({
      ...date,
    }))
  }

  async findOne( dateid: string ) {

    let date: Date;

    date = await this.dateRepository.findOneBy({ dateid });

    if ( !date ) 
      throw new NotFoundException(`Product with ${ dateid } not found`);

    return date;
  }

  async findOnePlain( dateid: string ) {
    const { 
       ...rest } = await this.findOne( dateid );
    return {
      ...rest,
    }
  }

  async update( dateid: string, updateDateDto: UpdateDateDto ) {

    const { 
      ...toUpdate } = updateDateDto; 

    const date = await this.dateRepository.preload({
      dateid, ...toUpdate 
    });

    if ( !date ) throw new NotFoundException(`Product with id: ${ dateid } not found`);

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      
      await queryRunner.manager.save( date );

      await queryRunner.commitTransaction();
      await queryRunner.release();

      return this.findOnePlain( dateid );
      
    } catch (error) {

      await queryRunner.rollbackTransaction();
      await queryRunner.release();
      this.handleDBExceptions(error);

    }

  }

  async remove(dateid: string) {
    const date = await this.findOne( dateid );
    await this.dateRepository.remove( date );
    
  }


  private handleDBExceptions( error: any ) {

    if ( error.code === '23505' )
      throw new BadRequestException(error.detail);
    
    this.logger.error(error)
    throw new InternalServerErrorException('Unexpected error, check server logs');

  }
  async deleteAllDates() {
    const query = this.dateRepository.createQueryBuilder('dat');

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