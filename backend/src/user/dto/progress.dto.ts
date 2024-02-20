import { IsNumber } from '@nestjs/class-validator';

export class ProgressDto{
    @IsNumber()
    batch_num: number;
    @IsNumber()
    dialog_num: number;
    @IsNumber()
    turn_num: number;
}