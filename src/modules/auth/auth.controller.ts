
import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseUUIDPipe } from '@nestjs/common';

import { AuthService } from './auth.service';

import { CreateUserDto, LoginUserDto, UpdateUserDto } from './dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  create(@Body() createUserDto: CreateUserDto) {
    return this.authService.create(createUserDto);
  }

  @Post('login')
  login(@Body() loginUserDto: LoginUserDto ) {
    return this.authService.login( loginUserDto );
  }

  @Get()
  findAll( @Query() paginationDto:PaginationDto ) {
    return this.authService.findAll( paginationDto );
  }

  @Get(':term')
  findOne(@Param('term') term: string) {
    return this.authService.findOnePlain(term);
  }

  @Patch(':userid')
  update(@Param('userid', ParseUUIDPipe ) userid: string, @Body() updateUserDto: UpdateUserDto) {
    return this.authService.update(userid, updateUserDto);
  }

  @Delete(':userid')
  remove(@Param('userid', ParseUUIDPipe ) userid: string) {
    return this.authService.remove(userid);
  }

}