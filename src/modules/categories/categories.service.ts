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

    private readonly dataSource: DataSource,

  ) {}

  async create(createCategoryDto: CreateCategoryDto) {
    try {
      const category = this.categoryRepository.create(createCategoryDto);
      await this.categoryRepository.save(category);
      return category;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Error en BD!')
    }
  }

  async findAll( paginationDto: PaginationDto ) {
    const { limit = 10, offset = 0 } = paginationDto;
    const categories = await this.categoryRepository.find({
      take: limit,
      skip: offset
    })
    return categories.map( ( category ) => ({
      ...category,
    }))
  }

  async findOne( term: string ) {

    let category: Category;

    if ( isUUID(term) ) {
      category = await this.categoryRepository.findOneBy({ catid: term });
    } else {
      const queryBuilder = this.categoryRepository.createQueryBuilder('cat'); 
      category = await queryBuilder
        .where('catname =:catname', {
          catname: term,
        })
        .getOne();
    }

    if ( !category ) 
      throw new NotFoundException(`Product with ${ term } not found`);

    return category;
  }

  async findOnePlain( term: string ) {
    const { 
       ...rest } = await this.findOne( term );
    return {
      ...rest,
    }
  }

  async update( catid: string, updateCategoryDto: UpdateCategoryDto ) {

    const { 
      ...toUpdate } = updateCategoryDto; 

    const category = await this.categoryRepository.preload({
      catid, ...toUpdate 
    });

    if ( !category ) throw new NotFoundException(`Product with id: ${ catid } not found`);

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      
      await queryRunner.manager.save( category );

      await queryRunner.commitTransaction();
      await queryRunner.release();

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
