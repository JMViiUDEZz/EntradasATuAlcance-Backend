import { IsString, MaxLength, MinLength, Length, IsBoolean, IsEmail, Matches } from "class-validator";


export class CreateUserDto {
    @IsString()
    username: string;
  
    @IsString()
    firstname: string;
  
    @IsString()
    lastname: string;

    @IsString()
    @MinLength(1)
    fullname: string;

    @IsString()
    city: string;

    @IsString()
    state: string;

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

    @IsString()
    phone: string;

    @IsBoolean()
    likesports: boolean;
  
    @IsBoolean()
    liketheatre: boolean;
  
    @IsBoolean() 
    likeconcerts: boolean;

    @IsBoolean()
    likejazz: boolean;

    @IsBoolean()
    likeclassical: boolean;

    @IsBoolean()
    likeopera: boolean;

    @IsBoolean()
    likerock: boolean;
    
    @IsBoolean()
    likevegas: boolean;

    @IsBoolean()
    likebroadway: boolean;

    @IsBoolean()
    likemusicals: boolean;
 }
