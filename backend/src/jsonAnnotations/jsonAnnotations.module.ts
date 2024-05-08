import { Module } from '@nestjs/common';
import { jsonAnnotationsService } from './jsonAnnotations.service';
import { MongooseModule } from '@nestjs/mongoose';
import { jsonAnnotationsSchema, jsonAnnotations } from './jsonAnnotations.schema';
import { jsonAnnotationsController } from './jsonAnnotations.controller';


@Module({
  imports: [
    MongooseModule.forFeature([{ name: jsonAnnotations.name, schema: jsonAnnotationsSchema }]) 

  ],
  controllers: [jsonAnnotationsController],
  providers: [jsonAnnotationsService]
})
export class jsonAnnotationsModule {}
