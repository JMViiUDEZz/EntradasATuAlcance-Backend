import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';

import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

import { Category } from '../categories/entities/category.entity';
import { validate as isUUID } from 'uuid';

@Injectable()
export class CategoriesService {

  private readonly logger = new Logger('CategoriesService');

  constructor(

    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    // private readonly clienteService: ClientesService

    private readonly dataSource: DataSource,

  ) {}

  async create(createCategoryDto: CreateCategoryDto) {
    // return 'This action adds a new category';
    try {
      // ANTES DE RELACION
      const category = this.categoryRepository.create(createCategoryDto);
      await this.categoryRepository.save(category);
      return category;
      
      // DESPUES DE RELACION MIA
      // const idC = createCategoryDto.idCliente;
      // const { idCliente, ...campos } = createCategoryDto;
      // console.log({ ...campos });
      // const cliente = this.clientesService.findOne( idCliente );
      // const category = this.categoryRepository.create({ ...campos });
      // category.cliente = await this.clientesService.findOne( idCliente );
      // await this.categoryRepository.save( category );
      // return category;

      // DESPUES DE RELACION CURSO
      // const { images = [], ...categoryDetails } = createCategoryDto;
      // const category = this.categoryRepository.create({
      //   ...categoryDetails,
      //   images: images.map( image => this.categoryImageRepository.create({ url: image }) )
      // });
      // await this.categoryRepository.save( category );
      // return { ...category, images };
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Error en BD!')
    }
  }

  async findAll( paginationDto: PaginationDto ) {
    // return `This action returns all categories`;
    // return this.categoryRepository.find({});
    const { limit = 10, offset = 0 } = paginationDto;
    const categories = await this.categoryRepository.find({
      take: limit,
      skip: offset
    })
    return categories.map( ( category ) => ({
      ...category,
      // images: category.images.map( img => img.url )
    }))
  }

  async findOne( term: string ) {

    let category: Category;

    if ( isUUID(term) ) {
      category = await this.categoryRepository.findOneBy({ catid: term });
    } else {
      // product = await this.productRepository.findOneBy({ slug: term });
      const queryBuilder = this.categoryRepository.createQueryBuilder('cat'); 
      category = await queryBuilder
        .where('catname =:catname', {
          catname: term,
        })
        // .leftJoinAndSelect('cat.images',
        // 'prodImages')
        .getOne();
    }
    // const product = await this.productRepository.findOneBy({ id });

    if ( !category ) 
      throw new NotFoundException(`Product with ${ term } not found`);

    return category;
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

  async update( catid: string, updateCategoryDto: UpdateCategoryDto ) {

    const { 
      // images, 
      ...toUpdate } = updateCategoryDto; 

    const category = await this.categoryRepository.preload({
      catid, ...toUpdate 
    });

    if ( !category ) throw new NotFoundException(`Product with id: ${ catid } not found`);

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // if( images ) {
        // await queryRunner.manager.delete(
        //   ProductImage
        //   , { category: { catid } }
        //   );
          // category.images = images.map(
        //   image => this.productImageRepository.create({ url: image })
        // )
      // } 
      // else {
      //   product.images = await this.productImageRepository.findBy({ product: { id } })
      // }

      // await this.productRepository.save( product );
      await queryRunner.manager.save( category );

      await queryRunner.commitTransaction();
      await queryRunner.release();

      // return product;
      return this.findOnePlain( catid );
      
    } catch (error) {

      await queryRunner.rollbackTransaction();
      await queryRunner.release();
      this.handleDBExceptions(error);

    }

  }

  async remove(catid: string) {
    const category = await this.findOne( catid );
    await this.categoryRepository.remove( category );
    
  }


  private handleDBExceptions( error: any ) {

    if ( error.code === '23505' )
      throw new BadRequestException(error.detail);
    
    this.logger.error(error)
    // console.log(error)
    throw new InternalServerErrorException('Unexpected error, check server logs');

  }
  async deleteAllCategories() {
    const query = this.categoryRepository.createQueryBuilder('category');

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

//   findOne(catid: string) {
//     // return `This action returns a #${catid} category`;
//   }

//   update(catid: string, updateCategoryDto: UpdateCategoryDto) {
//     // return `This action updates a #${catid} category`;
//   }

//   remove(catid: string) {
//     // return `This action removes a #${catid} category`;
//   }
// }
