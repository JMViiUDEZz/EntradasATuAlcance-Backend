import { IsIn, IsISO8601, IsNotEmpty, IsNumber, IsUppercase, IsString, MaxLength, MinLength, Length, IsBoolean, IsOptional } from "class-validator";

export class CreateDateDto {
    @IsString()    //@IsDate() @IsDateString() --> 2008-06-24
    // @IsNotEmpty()
    // @Length(10)
    caldate: string; //Date --> number
  
    @IsString()
    // @IsNotEmpty()
    // @Length(2)
    @IsUppercase()
    @IsIn(['MO','TU','WE','TH','FR','SU','SA'])
    day: string;
  
    @IsNumber()
    // @IsNotEmpty()
    // @MinLength(1)
    // @MaxLength(2)    
    week: number;

    @IsString()
    // @IsNotEmpty()
    // @Length(3)
    @IsUppercase()
    @IsIn(['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'])
    month: string;

    @IsNumber()
    // @IsNotEmpty()
    // @Length(1)
    qtr: number;

    @IsNumber()
    // @Length(4)   
    // @IsNotEmpty() 
    year: number;

    @IsBoolean()
    // @MinLength(4)
    // @MaxLength(5)
    @IsUppercase()
    @IsOptional()
    holiday?: boolean;
 }
