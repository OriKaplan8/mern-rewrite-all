import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class DialogData {
    @Prop()
    annotator_name: string;

    @Prop({ type: Map, of: Object })
    dialogs: Map<string, any>;

    @Prop({ type: Map, of: Object })
    annotations: Map<string, any>;
}

@Schema({ versionKey: false })
export class JsonFile extends Document {
    @Prop()
    batch_id: number;

    @Prop({ type: Map, of: DialogData })
    dialogs: Map<string, DialogData>;
}



export const JsonFileSchema = SchemaFactory.createForClass(JsonFile);
export const DialogDataSchema = SchemaFactory.createForClass(DialogData);