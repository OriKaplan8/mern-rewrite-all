import { Module } from '@nestjs/common';
import { AnnotationController } from './annotation.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AnnotationSchema } from './annotation.schema';
import { AnnotationService } from './annotation.service';

@Module({
  imports: [
    MongooseModule.forFeature([{name: 'Annotation', schema: AnnotationSchema}])
  ],
  controllers: [AnnotationController],
  providers: [AnnotationService]
})
export class AnnotationModule {} 
