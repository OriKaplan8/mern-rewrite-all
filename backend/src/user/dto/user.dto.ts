import { IsNumber } from '@nestjs/class-validator';

export class UserDto{
    @IsNumber()
    name: string;
    @IsNumber()
    email: string;
    @IsNumber()
    password: string;
    
    progress:number[];;
}