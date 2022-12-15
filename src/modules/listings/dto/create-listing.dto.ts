import { IsNotEmpty, IsString, IsNumber } from "class-validator";

export class CreateListingDto {
    @IsString()
    seller: string;
  
    @IsString()
    event: string;

    @IsString()
    date: string;

    @IsNumber()
    @IsNotEmpty()   
    numtickets: number;

    @IsNumber()
    @IsNotEmpty()
    priceperticket: number;

    @IsNumber()
    @IsNotEmpty()
    totalprice: number;

    @IsString() 
    listtime: string;

 }
