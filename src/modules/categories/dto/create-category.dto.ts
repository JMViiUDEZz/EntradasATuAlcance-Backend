import {IsIn, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from "class-validator";

export class CreateCategoryDto {
    @IsString()
    // @IsNotEmpty()
    // @MinLength(1)
    // @MaxLength(15)
    @IsIn(['Sports','Shows','Concerts'])
    catgroup: string;
  
    @IsString()
    // @IsNotEmpty()
    // @MinLength(1)
    // @MaxLength(15)
    catname: string;
  
    @IsString()
    // @MinLength(1)
    // @MaxLength(40)    
    @IsOptional()
    catdesc?: string;
 }