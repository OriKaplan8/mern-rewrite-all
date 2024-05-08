import { Controller, Get, Param, Post, Body, NotFoundException } from '@nestjs/common';
import { JsonService } from './jsonBatches.service';
import { jsonBatchesDto } from './jsonBatches.dto';
import { JsonBatches } from './jsonBatches.schema';

@Controller('jsonBatches')
export class JsonController {
    constructor(private readonly jsonService: JsonService) {}

    @Post()
    async create(@Body() createJsonDto: jsonBatchesDto): Promise<JsonBatches> {
        return this.jsonService.create(createJsonDto);
    }

    @Get(':fileId')
    async findByFileId(@Param('fileId') fileId: string): Promise<JsonBatches> {
        try {
            return await this.jsonService.findByFileId(fileId);
        } catch (error) {
            throw new NotFoundException(error.message);
        }
    }

    @Get()
    async findAll(): Promise<JsonBatches[]> {
        return this.jsonService.findAll();
    }
}
