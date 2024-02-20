import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Annotation extends Document{
    @Prop()
    user_id: string
    
    @Prop()
    batch_num: number

    @Prop()
    dialog_num: number

    @Prop()
    turn_num: number

    @Prop([Number])
    rewrites_scores: number[]

    @Prop([Number])
    rewrites_optimals: number[]

    @Prop()
    requires_rewrite: number

    @Prop()
    annotator_rewrite: string
}

export const AnnotationSchema = SchemaFactory.createForClass(Annotation);