import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';

import { CreateDateDto } from './dto/create-date.dto';
import { UpdateDateDto } from './dto/update-date.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

import { Date } from '../dates/entities/date.entity';
import { validate as isUUID } from 'uuid';

@Injectable()
export class DatesService {

  private readonly logger = new Logger('DatesService');

  constructor(

    @InjectRepository(Date)
    private readonly dateRepository: Repository<Date>,
    // private readonly clienteService: ClientesService

    private readonly dataSource: DataSource,

  ) {}

  
  async create(createDateDto: CreateDateDto) {
    // return 'This action adds a new date';
    try {
      // ANTES DE RELACION
      const date = this.dateRepository.create(createDateDto);
      await this.dateRepository.save(date);
      return date;
      
      // DESPUES DE RELACION MIA
      // const idC = createCategoryDto.idCliente;
      // const { idCliente, ...campos } = createCategoryDto;
      // console.log({ ...campos });
      // const cliente = this.clientesService.findOne( idCliente );
      // const date = this.dateRepository.create({ ...campos });
      // date.cliente = await this.clientesService.findOne( idCliente );
      // await this.dateRepository.save( date );
      // return date;

      // DESPUES DE RELACION CURSO
      // const { images = [], ...categoryDetails } = createCategoryDto;
      // const date = this.dateRepository.create({
      //   ...categoryDetails,
      //   images: images.map( image => this.categoryImageRepository.create({ url: image }) )
      // });
      // await this.dateRepository.save( date );
      // return { ...date, images };
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Error en BD!')
    }
  }

  async findAll( paginationDto: PaginationDto ) {
    // return `This action returns all date`;
    // return this.dateRepository.find({});
    const { limit = 10, offset = 0 } = paginationDto;
    const date = await this.dateRepository.find({
      take: limit,
      skip: offset
    })
    return date.map( ( date ) => ({
      ...date,
      // images: date.images.map( img => img.url )
    }))
  }

  async findOne( dateid: string ) {

    let date: Date;

    date = await this.dateRepository.findOneBy({ dateid });
    // const product = await this.productRepository.findOneBy({ id });

    if ( !date ) 
      throw new NotFoundException(`Product with ${ dateid } not found`);

    return date;
  }

  async findOnePlain( dateid: string ) {
    const { 
      // images = [],
       ...rest } = await this.findOne( dateid );
    return {
      ...rest,
      // images: images.map( image => image.url )
    }
  }

  async update( dateid: string, updateDateDto: UpdateDateDto ) {

    const { 
      // images, 
      ...toUpdate } = updateDateDto; 

    const date = await this.dateRepository.preload({
      dateid, ...toUpdate 
    });

    if ( !date ) throw new NotFoundException(`Product with id: ${ dateid } not found`);

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // if( images ) {
        // await queryRunner.manager.delete(
        //   ProductImage
        //   , { date: { dateid } }
        //   );
          // date.images = images.map(
        //   image => this.productImageRepository.create({ url: image })
        // )
      // } 
      // else {
      //   product.images = await this.productImageRepository.findBy({ product: { id } })
      // }

      // await this.productRepository.save( product );
      await queryRunner.manager.save( date );

      await queryRunner.commitTransaction();
      await queryRunner.release();

      // return product;
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
    // console.log(error)
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
//   create(createDateDto: CreateDateDto) {
//     return 'This action adds a new date';
//   }

//   findAll() {
//     return `This action returns all dates`;
//   }

//   findOne(dateid: string) {
//     return `This action returns a #${dateid} date`;
//   }

//   update(dateid: string, updateDateDto: UpdateDateDto) {
//     return `This action updates a #${dateid} date`;
//   }

//   remove(dateid: string) {
//     return `This action removes a #${dateid} date`;
//   }
// }
