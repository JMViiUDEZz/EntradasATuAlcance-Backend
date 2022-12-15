import { IsIn, IsNumber, IsUppercase, IsString, IsBoolean, IsOptional } from "class-validator";

export class CreateDateDto {
    @IsString()
    caldate: string;
  
    @IsString()
    @IsUppercase()
    @IsIn(['MO','TU','WE','TH','FR','SU','SA'])
    day: string;
  
    @IsNumber()   
    week: number;

    @IsString()
    @IsUppercase()
    @IsIn(['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'])
    month: string;

    @IsNumber()
    qtr: number;

    @IsNumber() 
    year: number;

    @IsBoolean()
    @IsUppercase()
    @IsOptional()
    holiday?: boolean;
 }
