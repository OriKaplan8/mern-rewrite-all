import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { jsonAnnotations } from './jsonAnnotations.schema';

@Injectable()
export class jsonAnnotationsService {
    constructor(
        @InjectModel(jsonAnnotations.name) private annotationModel: Model<jsonAnnotations>,

    ) {}


    async findByFileIdAndUsername(fileId: string, username: string) {
        console.log("fileId: ", fileId + " username: ", username);
        const foundJson = await this.annotationModel.findOne({ file_id: fileId, username: username }).exec();
    
        // If no document is found, return `null` instead of throwing an error
        if (!foundJson) {
            console.log(`Json document with file_id "${fileId}" not found for username "${username}"`);
            return null;  // No NotFoundException thrown
        }
        return foundJson;
    }
    
    async findAll() { 
        return this.annotationModel.find().exec();
    }
}
