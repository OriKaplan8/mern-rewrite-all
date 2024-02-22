import { Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { jwtGuard } from 'src/guard/jwt.guard';
import { GetUser } from 'src/auth/decorator/get-user-decorator';
import { User } from './user.schema';

@Controller('users')
export class UserController {
    constructor(private userService: UserService) {}

    @UseGuards(jwtGuard)
    @Get('currentUserProgress')
    async getUserProgress(@GetUser() user: User, ){
        return await this.userService.userProgress(user);
    }


    @UseGuards(jwtGuard)
    @Get('currentUserTurn')
    async getCurrentUserTurn(@GetUser() user: User, ){
        return await this.userService.getCurrentUserTurn(user);
    }

    @UseGuards(jwtGuard)
    @Get('currentUserDialogTurns')
    async getCurrentUserDialogTurns(@GetUser() user: User, ){
        return await this.userService.getCurrentUserDialogTurns(user);
    }

    @UseGuards(jwtGuard)
    @Patch('nextUserTurn')
    async nextUserTurn(@GetUser() user: User, ){
        return await this.userService.nextUserTurn(user);
    }

    @UseGuards(jwtGuard)
    @Get('name')
    async name(@GetUser() user: User, ){
        return await this.userService.getName(user);
    }

    @UseGuards(jwtGuard)
    @Get('turnNum')
    async getTurnNum(@GetUser() user: User, ){
        return await this.userService.getTurnNum(user);
    }

    @UseGuards(jwtGuard)
    @Get('dialogNum')
    async getDialogNum(@GetUser() user: User, ){
        return await this.userService.getDialogNum(user);
    }








}


