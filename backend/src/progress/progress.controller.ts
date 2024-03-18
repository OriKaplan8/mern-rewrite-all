import { Controller, Get, Headers } from '@nestjs/common';
import { ProgressService } from './progress.service';
import { User } from 'src/user/user.schema';

@Controller('progress')
export class ProgressController {
    constructor(private progressService: ProgressService){}

    @Get('globalProgress')
    async getGlobalProgress(@Headers('userid') userId: string) {
        return await this.progressService.globalProgress(userId);
    }

    @Get('globalProgressAllAnnotators')
    async globalProgressForAllAnnotators() {
        return await this.progressService.globalProgressForAllAnnotators();
    }
}
