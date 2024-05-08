import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

// Define your schema class
@Schema({ collection: 'json_annotations', versionKey: false }) // Replace with your desired collection name
export class jsonAnnotations extends Document {
    @Prop({ required: true })
    file_id: string;

    @Prop({ required: true, type: Object })
    json_data: Record<string, any>;

    @Prop({ required: true })
    username: string;
}

// Create the schema factory
export const jsonAnnotationsSchema = SchemaFactory.createForClass(jsonAnnotations);  
 