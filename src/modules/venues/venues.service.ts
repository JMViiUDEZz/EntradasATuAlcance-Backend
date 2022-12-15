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
    // private readonly clienteService: ClientesService

    private readonly dataSource: DataSource,

  ) {}

  
  async create(createVenueDto: CreateVenueDto) {
    // return 'This action adds a new venue';
    try {
      // ANTES DE RELACION
      const venue = this.venueRepository.create(createVenueDto);
      await this.venueRepository.save(venue);
      return venue;
      
      // DESPUES DE RELACION MIA
      // const idC = createVenueDto.idCliente;
      // const { idCliente, ...campos } = createVenueDto;
      // console.log({ ...campos });
      // const cliente = this.clientesService.findOne( idCliente );
      // const venue = this.venueRepository.create({ ...campos });
      // venue.cliente = await this.clientesService.findOne( idCliente );
      // await this.venueRepository.save( venue );
      // return venue;

      // DESPUES DE RELACION CURSO
      // const { images = [], ...categoryDetails } = createVenueDto;
      // const venue = this.venueRepository.create({
      //   ...categoryDetails,
      //   images: images.map( image => this.categoryImageRepository.create({ url: image }) )
      // });
      // await this.venueRepository.save( venue );
      // return { ...venue, images };
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Error en BD!')
    }
  }

  async findAll( paginationDto: PaginationDto ) {
    // return `This action returns all venues`;
    // return this.venueRepository.find({});
    const { limit = 10, offset = 0 } = paginationDto;
    const venues = await this.venueRepository.find({
      take: limit,
      skip: offset
    })
    return venues.map( ( venue ) => ({
      ...venue,
      // images: venue.images.map( img => img.url )
    }))
  }

  async findOne( term: string ) {

    let venue: Venue;

    if ( isUUID(term) ) {
      venue = await this.venueRepository.findOneBy({ venueid: term });
    } else {
      // product = await this.productRepository.findOneBy({ slug: term });
      const queryBuilder = this.venueRepository.createQueryBuilder('ven'); 
      venue = await queryBuilder
        .where('venuename =:venuename', {
          venuename: term,
        })
        // .leftJoinAndSelect('ven.images',
        // 'prodImages')
        .getOne();
    }
    // const product = await this.productRepository.findOneBy({ id });

    if ( !venue ) 
      throw new NotFoundException(`Product with ${ term } not found`);

    return venue;
  }

  async findOnePlain( term: string ) {
    const { 
      // images = [],
       ...rest } = await this.findOne( term );
    return {
      ...rest,
      // images: images.map( image => image.url )
    }
  }

  async update( venueid: string, updateVenueDto: UpdateVenueDto ) {

    const { 
      // images, 
      ...toUpdate } = updateVenueDto; 

    const venue = await this.venueRepository.preload({
      venueid, ...toUpdate 
    });

    if ( !venue ) throw new NotFoundException(`Product with id: ${ venueid } not found`);

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // if( images ) {
        // await queryRunner.manager.delete(
        //   ProductImage
        //   , { venue: { venueid } }
        //   );
          // venue.images = images.map(
        //   image => this.productImageRepository.create({ url: image })
        // )
      // } 
      // else {
      //   product.images = await this.productImageRepository.findBy({ product: { id } })
      // }

      // await this.productRepository.save( product );
      await queryRunner.manager.save( venue );

      await queryRunner.commitTransaction();
      await queryRunner.release();

      // return product;
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
    // console.log(error)
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

//   create(createVenueDto: CreateVenueDto) {
//     return 'This action adds a new venue';
//   }

//   findAll() {
//     return `This action returns all venues`;
//   }

//   findOne(venueid: string) {
//     return `This action returns a #${venueid} venue`;
//   }

//   update(venueid: string, updateVenueDto: UpdateVenueDto) {
//     return `This action updates a #${venueid} venue`;
//   }

//   remove(venueid: string) {
//     return `This action removes a #${venueid} venue`;
//   }
// }
