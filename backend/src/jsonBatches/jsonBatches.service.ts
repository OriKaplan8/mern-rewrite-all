import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JsonBatches } from './jsonBatches.schema';
import { jsonBatchesDto } from './jsonBatches.dto';

@Injectable()
export class JsonService {
    constructor(@InjectModel(JsonBatches.name) private jsonModel: Model<JsonBatches>) {}


    async findAll(): Promise<JsonBatches[]> {
        return this.jsonModel.find().exec();
    }
    async create(createJsonDto: jsonBatchesDto): Promise<JsonBatches> {
        const createdJson = new this.jsonModel(createJsonDto);
        return createdJson.save();
    }

    async findByFileId(fileId: string): Promise<JsonBatches> {
        const foundJson = await this.jsonModel.findOne({ file_id: fileId }).exec();
        if (!foundJson) {
            throw new NotFoundException(`Json document with file_id "${fileId}" not found`);
        }
        return foundJson; 
    }
}
