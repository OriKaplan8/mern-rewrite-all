import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ versionKey: false })
export class Turn extends Document {
  @Prop()
  batch_num: number;

  @Prop()
  dialog_num: number;

  @Prop()
  turn_num: number;

  @Prop()
  question_text: string;

  @Prop()
  answer_text: string;

  @Prop([String])
  rewrites: string[];
}

export const TurnSchema = SchemaFactory.createForClass(Turn);