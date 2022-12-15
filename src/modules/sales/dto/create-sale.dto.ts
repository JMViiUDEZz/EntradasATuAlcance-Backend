import { IsNotEmpty, IsString, MaxLength, MinLength, Length, IsDate, IsNumber, IsDecimal, IsArray, IsOptional } from "class-validator";

export class CreateSaleDto {
    @IsArray()
    @IsString({ each: true })
    @IsOptional()
    list?: string[];

    @IsString()
    seller: string;
  
    @IsString()
    buyer: string;

    @IsArray()
    @IsString({ each: true })
    @IsOptional()
    event?: string[];
   
    @IsString()
    date: string;

    @IsNumber()
    // @IsNotEmpty()
    // @Length(1)    
    qtysold: number;

    @IsNumber()
    // @IsNotEmpty()
    // @MinLength(1)    
    // @MaxLength(4) 
    pricepaid: number;

    @IsNumber()
    // @IsDecimal()
    // @IsNotEmpty()
    // @MinLength(1)    
    // @MaxLength(6) 
    commission: number;

    @IsString()
    // @IsNotEmpty()
    // @Length(10)  
    saletime: string;
 }
