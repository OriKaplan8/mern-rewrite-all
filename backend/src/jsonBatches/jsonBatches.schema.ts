import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

// Define your schema class
@Schema({ collection: 'json_batches', versionKey: false }) // Replace with your desired collection name
export class JsonBatches extends Document {
    @Prop({ required: true })
    project_name: string;

    @Prop({ required: true })
    uploaded_time: Date;

    @Prop({ required: true })
    file_id: string;

    @Prop({ required: true, type: Object })
    json_data: Record<string, any>;
}

// Create the schema factory
export const JsonBatchesSchema = SchemaFactory.createForClass(JsonBatches);  
 