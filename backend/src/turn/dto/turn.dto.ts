import { IsNotEmpty } from '@nestjs/class-validator'

export class TurnDto {
    
    @IsNotEmpty()
    readonly batch_num: number;
    @IsNotEmpty()
    readonly dialog_num: number;
    @IsNotEmpty()
    readonly turn_num: number;

    @IsNotEmpty()
    readonly question_text: string;
    @IsNotEmpty()
    readonly answer_text: string;

    @IsNotEmpty()
    readonly rewrites: string[];
}