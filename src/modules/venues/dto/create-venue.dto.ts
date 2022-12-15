import { IsNotEmpty, IsNumber, IsOptional, IsString, IsUppercase, Length, MaxLength, MinLength } from "class-validator";

export class CreateVenueDto {
    @IsString()
    // @IsNotEmpty()
    // @MinLength(1)
    // @MaxLength(25)
    venuename: string;
  
    @IsString()
    // @IsNotEmpty()
    // @MinLength(1)
    // @MaxLength(15)
    venuecity: string;
  
    @IsString()
    // @IsNotEmpty()
    // @Length(2)
    @IsUppercase()
    venuestate: string;

    @IsNumber()
    // @MinLength(1)
    // @MaxLength(6)    
    @IsOptional()
    venueseats?: number;
 }