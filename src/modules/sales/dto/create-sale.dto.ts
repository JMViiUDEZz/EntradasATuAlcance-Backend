import { IsString, IsNumber, IsArray, IsOptional } from "class-validator";

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
    qtysold: number;

    @IsNumber()
    pricepaid: number;

    @IsNumber()
    commission: number;

    @IsString()
    saletime: string;
 }
