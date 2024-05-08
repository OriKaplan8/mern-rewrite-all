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
    @Get('name')
    async name(@GetUser() user: User, ){
        return await this.userService.getName(user);
    }






}


