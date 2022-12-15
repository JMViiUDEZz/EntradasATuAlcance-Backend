import { IsNotEmpty, IsString, MaxLength, MinLength, Length, IsDate, IsNumber, IsDecimal } from "class-validator";

export class CreateListingDto {
    @IsString()
    seller: string;
  
    @IsString()
    event: string;

    @IsString()
    date: string;

    @IsNumber()
    @IsNotEmpty()
    // @MinLength(1)    
    // @MaxLength(2)    
    numtickets: number;

    @IsNumber() //@IsDecimal()
    @IsNotEmpty()
    // @MinLength(1)    
    // @MaxLength(6) 
    priceperticket: number;

    @IsNumber() //@IsDecimal()
    @IsNotEmpty()
    // @MinLength(1)    
    // @MaxLength(8) 
    totalprice: number;

    @IsString()
    // @IsNotEmpty()
    // @Length(10)  
    listtime: string;

 }
