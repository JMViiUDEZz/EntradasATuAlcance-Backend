import { IsIn, IsISO8601, IsNotEmpty, IsNumber, IsUppercase, IsString, MaxLength, MinLength, Length, IsBoolean, IsEmail, Matches } from "class-validator";


export class CreateUserDto {
    @IsString()
    // @IsNotEmpty()
    // @MinLength(1)
    username: string;
  
    @IsString()
    // @IsNotEmpty()
    // @MinLength(1)
    firstname: string;
  
    @IsString()
    // @IsNotEmpty()
    // @MinLength(1)  
    lastname: string;

    @IsString()
    @MinLength(1)
    fullname: string;

    @IsString()
    // @IsNotEmpty()
    // @MinLength(1)
    city: string;

    @IsString()
    // @IsNotEmpty()
    // @MinLength(1)
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

    // @IsString()
    // // @IsNotEmpty()
    // // @MinLength(1)
    // email: string;

    @IsString()
    // @IsNotEmpty()
    // @MinLength(1)
    phone: string;

    @IsBoolean()
    // @IsNotEmpty()
    // @MinLength(1)
    likesports: boolean;
  
    @IsBoolean()
    // @IsNotEmpty()
    // @MinLength(1)
    liketheatre: boolean;
  
    @IsBoolean()
    // @IsNotEmpty()
    // @MinLength(1) 
    likeconcerts: boolean;

    @IsBoolean()
    // @IsNotEmpty()
    // @MinLength(1)
    likejazz: boolean;

    @IsBoolean()
    // @IsNotEmpty()
    // @MinLength(1)
    likeclassical: boolean;

    @IsBoolean()
    // @IsNotEmpty()
    // @MinLength(1)
    likeopera: boolean;

    @IsBoolean()
    // @IsNotEmpty()
    // @MinLength(1)
    likerock: boolean;
    
    @IsBoolean()
    // @IsNotEmpty()
    // @MinLength(1)
    likevegas: boolean;

    @IsBoolean()
    // @IsNotEmpty()
    // @MinLength(1)
    likebroadway: boolean;

    @IsBoolean()
    // @IsNotEmpty()
    // @MinLength(1)
    likemusicals: boolean;
 }
