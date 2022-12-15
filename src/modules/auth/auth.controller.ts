
import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseUUIDPipe, UseGuards, Req, Headers, SetMetadata } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { IncomingHttpHeaders } from 'http';

import { AuthService } from './auth.service';
// import { RawHeaders, GetUser, Auth } from './decorators';
// import { RoleProtected } from './decorators/role-protected.decorator';

import { CreateUserDto, LoginUserDto, UpdateUserDto } from './dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { User } from './entities/user.entity';
// import { UserRoleGuard } from './guards/user-role.guard';
import { ValidRoles } from './interfaces';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.authService.create(createUserDto);
  }

  @Post()
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

  // @Post('register')
  // createUser(@Body() createUserDto: CreateUserDto ) {
  //   return this.authService.create( createUserDto );
  // }

  // @Post('login')
  // loginUser(@Body() loginUserDto: LoginUserDto ) {
  //   return this.authService.login( loginUserDto );
  // }

  // @Get('check-status')
  // @Auth()
  // checkAuthStatus(
  //   @GetUser() user: User
  // ) {
  //   return this.authService.checkAuthStatus( user );
  // }

  // @Get('private')
  // @UseGuards( AuthGuard() )
  // testingPrivateRoute(
  //   @Req() request: Express.Request,
  //   @GetUser() user: User,
  //   @GetUser('email') userEmail: string,
    
  //   @RawHeaders() rawHeaders: string[],
  //   @Headers() headers: IncomingHttpHeaders,
  // ) {
  //   return {
  //     ok: true,
  //     message: 'Hola Mundo Private',
  //     user,
  //     userEmail,
  //     rawHeaders,
  //     headers
  //   }
  // }

  // @SetMetadata('roles', ['admin','super-user'])

//   @Get('private2')
//   @RoleProtected( ValidRoles.superUser, ValidRoles.admin )
//   @UseGuards( AuthGuard(), UserRoleGuard )
//   privateRoute2(
//     @GetUser() user: User
//   ) {
//     return {
//       ok: true,
//       user
//     }
//   }

//   @Get('private3')
//   @Auth( ValidRoles.admin )
//   privateRoute3(
//     @GetUser() user: User
//   ) {
//     return {
//       ok: true,
//       user
//     }
//   }

}