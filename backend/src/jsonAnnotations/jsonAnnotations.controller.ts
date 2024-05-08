import { Controller, Get, Param } from '@nestjs/common';
import { jsonAnnotationsService } from './jsonAnnotations.service';

@Controller('jsonAnnotations')
export class jsonAnnotationsController {
    constructor(
        private readonly annotationsService: jsonAnnotationsService,
    ) {}

    @Get()
    async findAll() {
        return this.annotationsService.findAll();
    }


    @Get(':fileId'+ "/" + ':username')
    async findByFileIdAndUsername(@Param('fileId') fileId: string, @Param('username') username: string) {
        return this.annotationsService.findByFileIdAndUsername(fileId, username);
    }




}
