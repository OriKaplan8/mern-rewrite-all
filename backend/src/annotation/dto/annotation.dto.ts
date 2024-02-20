import { IsNotEmpty } from "@nestjs/class-validator";
import { IsNumber, IsString } from "class-validator";

export class AnnotationDto {
    @IsNotEmpty()
    @IsNumber()
    batch_num: number
    @IsNumber()
    @IsNotEmpty()
    dialog_num: number
    @IsNumber()
    @IsNotEmpty()
    turn_num: number

    @IsNotEmpty()
    rewrites_scores: number[]
    @IsNotEmpty()
    rewrites_optimals: number[]

    @IsNotEmpty()
    @IsNumber()
    requires_rewrite: number
    @IsNotEmpty()
    @IsString()
    annotator_rewrite: string
}