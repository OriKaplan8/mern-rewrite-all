import { Injectable } from '@nestjs/common';
import { AnnotationDto } from './dto/annotation.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Annotation } from './annotation.schema';
import { Model } from 'mongoose';


@Injectable()
export class AnnotationService {
    constructor (
        
        @InjectModel('Annotation') private readonly annotationModel: Model<Annotation>
        ) {}
    async annotate(annotationDto: AnnotationDto, user) {
        const { userId } = user;
        const newAnnotation = await this.annotationModel.create({user_id: userId,
            ...annotationDto});

        
        return newAnnotation.toObject();
    } 
}
