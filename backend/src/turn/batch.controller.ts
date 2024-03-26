import { Post, Body, Controller, Get, Param, UseGuards, HttpCode, HttpStatus, UploadedFile, UseInterceptors, BadRequestException, Res, UploadedFiles } from '@nestjs/common';
import { TurnService } from './turn.service';
import { jwtGuard } from 'src/guard/jwt.guard';
import { TurnDto } from './dto/turn.dto';
import { GetUser } from 'src/auth/decorator/get-user-decorator';
import { User } from 'src/user/user.schema';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import {diskStorage} from "multer";
import { join } from 'path';

@Controller('batch')
export class BatchController {
    constructor(private turnService: TurnService) {}
      

    @Get(':batch_num/dialog/:dialog_num')
    async getTurnsByDialogNum(@Param('dialog_num') dialog_num: number,
    @Param('batch_num') batch_num: number){
        return await this.turnService.getAllTurnsByDialogNum(batch_num, dialog_num);
    }

    @Get(':batch_num/dialog/:dialog_num/len')
    async getDialogLenByDialogNum(@Param('dialog_num') dialog_num: number,
    @Param('batch_num') batch_num: number){

        return await this.turnService.getDialogLenByDialogNum(batch_num, dialog_num);
    }

    @Get(':batch_num/len')
    async getBatchLenByDialogNum(@Param('batch_num') batch_num: number){

        return await this.turnService.getBatchLenByDialogNum(batch_num);
    }

    @Get('UserCurrentBatch')
    async getUserCurrentBatch(@GetUser() user: User,){
        return await this.turnService.getUserCurrentBatch(user);
    }

    @Post('uploadBatch')
    @UseInterceptors(FilesInterceptor('file', 10, {
    storage: diskStorage({
        destination: './tempUploads',
        filename: (req, file, cb) => {
        const name = file.originalname.split('.')[0];
        const fileExtension = file.originalname.split('.')[1];
        const newFileName = name.split("").join('_') + '_' + Date.now() + '.' + fileExtension;
        cb(null, newFileName);
        }
    }),
    fileFilter: (req, file, cb) => {
        if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
        return cb(null, false);
        }
        cb(null, true);
    }
    }))
    uploadBatch(@UploadedFiles() files: Express.Multer.File[]) {
    if (!files || files.length === 0) {
        throw new BadRequestException('File is not good');
    } else {
        
        const response = files.map(file => ({
            filepath: `http://localhost:5000/posts/pictures/${file.filename}`
        }));
        console.log(response)
        return response;
    }
    }
   


    @Get('tempUploads/:path')
    seeUploadedFile(@Param('path') path, @Res() res) {
    const filename = join(process.cwd(), 'tempUploads', path);
    res.download(filename);
    }

    

    
  
   
    
    
}


