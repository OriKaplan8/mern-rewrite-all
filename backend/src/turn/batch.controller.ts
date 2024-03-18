import { Post, Body, Controller, Get, Param, UseGuards, HttpCode, HttpStatus } from '@nestjs/common';
import { TurnService } from './turn.service';
import { jwtGuard } from 'src/guard/jwt.guard';
import { TurnDto } from './dto/turn.dto';
import { GetUser } from 'src/auth/decorator/get-user-decorator';
import { User } from 'src/user/user.schema';

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

    

    
  
   
    
    
}


