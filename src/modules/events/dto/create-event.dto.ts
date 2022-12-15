import { IsString } from "class-validator";

export class CreateEventDto {
    @IsString()
    venue: string;
    
    @IsString()
    cat: string;

    @IsString()
    date: string;

    @IsString() 
    eventname: string;

    @IsString()
    starttime: string;
 }
