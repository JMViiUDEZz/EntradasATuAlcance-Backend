import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';

import { CreateSaleDto } from './dto/create-sale.dto';
import { UpdateSaleDto } from './dto/update-sale.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

import { Sale } from './entities/sale.entity';

import { AuthService } from '../auth/auth.service';
import { DatesService } from '../dates/dates.service';
import { Listing } from '../listings/entities/listing.entity';
import { Event } from '../events/entities/event.entity';

@Injectable()
export class SalesService {

  private readonly logger = new Logger('SalesService');

  constructor(

    @InjectRepository(Sale)
    private readonly saleRepository: Repository<Sale>,
    private readonly authService: AuthService,
    private readonly dateService: DatesService,

    @InjectRepository(Listing)
    private readonly listingRepository: Repository<Listing>,
    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>,

    private readonly dataSource: DataSource,

  ) {}

  
  async create(createSaleDto: CreateSaleDto) {
    try {

      const { list, seller, buyer, event, date, ...campos } = createSaleDto;

      const sale = this.saleRepository.create({
          ...campos,
          list: list.map( lis => this.listingRepository.create({ listid: lis }) ),
          event: event.map( even => this.eventRepository.create({ eventid: even }) ),
        });
      sale.seller = await this.authService.findOne( seller );
      sale.buyer = await this.authService.findOne( buyer );
      sale.date = await this.dateService.findOne( date );
      await this.saleRepository.save( sale );
      return { ...sale, list, seller, buyer, event, date };
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Error en BD!')
    }
  }

  async findAll( paginationDto: PaginationDto ) {
    const { limit = 10, offset = 0 } = paginationDto;
    const sales = await this.saleRepository.find({
      take: limit,
      skip: offset
    })
    return sales.map( ( sale ) => ({
      ...sale,
      list: sale.list.map ( list => list.listid), 
      seller: sale.seller.userid, 
      buyer: sale.buyer.userid, 
      event: sale.event.map ( eve => eve.eventid),  
      date: sale.date.dateid,
    }))
  }

  async findOne( saleid: string ) {

    let sale: Sale;

    sale = await this.saleRepository.findOneBy({ saleid });

    if ( !sale ) 
      throw new NotFoundException(`Product with ${ saleid } not found`);

    return sale;
  }

  async findOnePlain( saleid: string ) {
    const { 
      list = [],
      seller, 
      buyer, 
      event = [],
      date,
       ...rest } = await this.findOne( saleid );
    return {
      ...rest,
      list: list.map ( lis => lis.listid), 
      seller: seller.userid,
      buyer: buyer.userid, 
      event: event.map ( eve => eve.eventid),
      date: date.dateid,
    }
  }

  async update( saleid: string, updateSaleDto: UpdateSaleDto ) {

    const { 
      list, 
      seller, 
      buyer, 
      event, 
      date,
      ...toUpdate } = updateSaleDto;

    const sale = await this.saleRepository.preload({
      saleid, ...toUpdate 
    });

    if ( !sale ) throw new NotFoundException(`Product with id: ${ saleid } not found`);

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      if( list ) {
        sale.list = list.map(
          lis => this.listingRepository.create({ listid: lis }),
        )
      } 
      else {
        sale.list = await this.listingRepository.findBy({ sale: { saleid } })
      }

      if( seller ) {
        sale.seller = await this.authService.findOne( seller );
      }

      if( buyer ) {
        sale.buyer = await this.authService.findOne( buyer );
      } 

      if( event ) {
        sale.event = event.map(
          eve => this.eventRepository.create({ eventid: eve })
        )
      }
      else {
        sale.event = await this.eventRepository.findBy({ sale: { saleid } })
      }

      if( date ) {
        sale.date = await this.dateService.findOne( date );
      }
      
      await queryRunner.manager.save( sale );

      await queryRunner.commitTransaction();
      await queryRunner.release();

      return this.findOnePlain( saleid );
      
    } catch (error) {

      await queryRunner.rollbackTransaction();
      await queryRunner.release();
      this.handleDBExceptions(error);

    }

  }

  async remove(saleid: string) {
    const sale = await this.findOne( saleid );
    await this.saleRepository.remove( sale );
    
  }


  private handleDBExceptions( error: any ) {

    if ( error.code === '23505' )
      throw new BadRequestException(error.detail);
    
    this.logger.error(error)
    throw new InternalServerErrorException('Unexpected error, check server logs');

  }
  async deleteAllSales() {
    const query = this.saleRepository.createQueryBuilder('sale');

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
