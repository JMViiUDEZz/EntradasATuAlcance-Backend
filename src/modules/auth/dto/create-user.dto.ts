import { IsString, MaxLength, MinLength, Length, IsBoolean, IsEmail, Matches, IsOptional } from 'class-validator';


export class CreateUserDto {
    @IsOptional()
    @IsString()
    username?: string;
  
    @IsOptional()
    @IsString()
    firstname?: string;
  
    @IsOptional()
    @IsString()
    lastname?: string;

    @IsString()
    @MinLength(1)
    fullname: string;

    @IsOptional()
    @IsString()
    city?: string;

    @IsOptional()
    @IsString()
    state?: string;

    @IsString()
    @IsEmail()
    email: string;

    @IsString()
    @MinLength(6)
    @MaxLength(50)
    @Matches(
    /(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'The password must have a Uppercase, lowercase letter and a number'
    })
    password: string;

    @IsOptional()
    @IsString()
    role?: string;

    @IsOptional()
    @IsString()
    phone?: string;

    @IsOptional()
    @IsBoolean()
    likesports?: boolean;
  
    @IsOptional()
    @IsBoolean()
    liketheatre?: boolean;
  
    @IsOptional()
    @IsBoolean() 
    likeconcerts?: boolean;

    @IsOptional()
    @IsBoolean()
    likejazz?: boolean;

    @IsOptional()
    @IsBoolean()
    likeclassical?: boolean;

    @IsOptional()
    @IsBoolean()
    likeopera?: boolean;

    @IsOptional()
    @IsBoolean()
    likerock?: boolean;
    
    @IsOptional()
    @IsBoolean()
    likevegas?: boolean;

    @IsOptional()
    @IsBoolean()
    likebroadway?: boolean;

    @IsOptional()
    @IsBoolean()
    likemusicals?: boolean;
 }
