import {IsIn, IsOptional, IsString } from "class-validator";

export class CreateCategoryDto {
    @IsString()
    @IsIn(['Sports','Shows','Concerts'])
    catgroup: string;
  
    @IsString()
    catname: string;
  
    @IsString()  
    @IsOptional()
    catdesc?: string;
 }