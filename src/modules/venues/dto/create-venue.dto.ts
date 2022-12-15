import { IsNumber, IsOptional, IsString, IsUppercase } from "class-validator";

export class CreateVenueDto {
    @IsString()
    venuename: string;
  
    @IsString()
    venuecity: string;
  
    @IsString()
    @IsUppercase()
    venuestate: string;

    @IsNumber()    
    @IsOptional()
    venueseats?: number;
 }