import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JsonBatches, JsonBatchesSchema } from './jsonBatches.schema';
import { JsonService } from './jsonBatches.service';
import { JsonController } from './jsonBatches.controller';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: JsonBatches.name, schema: JsonBatchesSchema }])
    ],
    controllers: [JsonController],
    providers: [JsonService],
    exports: [JsonService]
})
export class JsonBatchesModule {}  
 