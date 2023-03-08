import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';

import * as bcrypt from 'bcrypt';

import { User } from './entities/user.entity';
import { LoginUserDto, CreateUserDto, UpdateUserDto } from './dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { validate as isUUID } from 'uuid';

@Injectable()
export class AuthService {

  private readonly logger = new Logger('AuthService');

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    private readonly dataSource: DataSource,

    private readonly jwtService: JwtService,
  ) {}


  async create( createUserDto: CreateUserDto) {

    try {

      const { password, ...userData } = createUserDto;
      
      const user = this.userRepository.create({
        ...userData,
        password: bcrypt.hashSync( password, 10 )
      });

      await this.userRepository.save( user )
      delete user.password;

      return {
        ...user,
        token: this.getJwtToken({ email: user.email })
      };

    } catch (error) {
      this.handleDBErrors(error);
    }

  }

  async findAll( paginationDto: PaginationDto ) {
    const { limit = 10, offset = 0 } = paginationDto;
    const users = await this.userRepository.find({
      take: limit,
      skip: offset
    })
    return users.map( ( user ) => ({
      ...user,
    }))
  }

  async findOne( term: string ) {

    let user: User;

    if ( isUUID(term) ) {
      user = await this.userRepository.findOneBy({ userid: term });
    } else {
      const queryBuilder = this.userRepository.createQueryBuilder('use'); 
      user = await queryBuilder
        .where('username =:username', {
          username: term,
        })
        .getOne();
    }

    if ( !user ) 
      throw new NotFoundException(`Product with ${ term } not found`);

    return user;
  }

  async findOnePlain( term: string ) {
    const { 
       ...rest } = await this.findOne( term );
    return {
      ...rest,
    }
  }

  async update( userid: string, updateUserDto: UpdateUserDto ) {

    const { 
      ...toUpdate } = updateUserDto; 

    const user = await this.userRepository.preload({
      userid, ...toUpdate 
    });

    if ( !user ) throw new NotFoundException(`Product with id: ${ userid } not found`);

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
    
      await queryRunner.manager.save( user );

      await queryRunner.commitTransaction();
      await queryRunner.release();

      return this.findOnePlain( userid );
      
    } catch (error) {

      await queryRunner.rollbackTransaction();
      await queryRunner.release();
      this.handleDBExceptions(error);

    }

  }

  async remove(userid: string)  {
    const user = await this.findOne( userid );
    await this.userRepository.remove( user );
    
  }

  async login( loginUserDto: LoginUserDto ) {

    const { password, email } = loginUserDto;

    const user = await this.userRepository.findOne({
      where: { email },
      select: { email: true, password: true, fullname: true } //! OJO!
    });

    if ( !user ) 
      throw new UnauthorizedException('Credentials are not valid (email)');
      
    if ( !bcrypt.compareSync( password, user.password ) )
      throw new UnauthorizedException('Credentials are not valid (password)');

    return {
      ...user,
      token: this.getJwtToken({ email: user.email })
    };
  }

  async checkAuthStatus( user: User ){

    return {
      ...user,
      token: this.getJwtToken({ email: user.email })
    };

  }


  private getJwtToken( payload: JwtPayload ) {

    const token = this.jwtService.sign( payload );
    return token;

  }

  private handleDBErrors( error: any ): never {


    if ( error.code === '23505' ) 
      throw new BadRequestException( error.detail );
    
    this.logger.error(error)
    throw new InternalServerErrorException('Please check server logs');

  }

  private handleDBExceptions( error: any ) {

    if ( error.code === '23505' )
      throw new BadRequestException(error.detail);
    
    this.logger.error(error)
    throw new InternalServerErrorException('Unexpected error, check server logs');

  }

  async deleteAllUsers() {
    const query = this.userRepository.createQueryBuilder('user');

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