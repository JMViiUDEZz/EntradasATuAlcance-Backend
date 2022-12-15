import { IsNotEmpty, IsString, MaxLength, MinLength, Length, IsDate } from "class-validator";

export class CreateEventDto {
    @IsString()
    venue: string;
    
    @IsString()
    cat: string;

    @IsString()
    date: string;

    @IsString()
    // @IsNotEmpty()
    // @MinLength(1)    
    // @MaxLength(20)    
    eventname: string;

    @IsString()
    // @IsNotEmpty()
    // @Length(10)
    starttime: string;
 }
