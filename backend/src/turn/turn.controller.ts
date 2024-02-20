import { Post, Body, Controller, Get, Param, UseGuards, HttpCode, HttpStatus } from '@nestjs/common';
import { TurnService } from './turn.service';
import { jwtGuard } from 'src/guard/jwt.guard';
import { TurnDto } from './dto/turn.dto';
import { GetUser } from 'src/auth/decorator/get-user-decorator';
import { User } from 'src/user/user.schema';

@Controller('turns')
export class TurnController {
    constructor(private turnService: TurnService) {}
      
    @HttpCode(HttpStatus.CREATED)
    @Post('insert')
    async insertTurn(
        @Body() turnDto: TurnDto,
    ) {
        return this.turnService.insertTurn(turnDto)
    }



    
    @Get()
    async getAllTurns() {
        return await this.turnService.getAllTurns()
    }

   
    
    
}


