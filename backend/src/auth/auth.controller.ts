import { Body, Controller, Post, Get, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signup.dto';
import { SignInDto } from './dto/signin.dto';
import { GetUser } from './decorator/get-user-decorator';
import { jwtGuard } from 'src/guard/jwt.guard';


@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    //TODO: LOOK AT JOI AND IMPLEMENT
    //TODO: TRIM AND TOLOWER CASE ALL VALUES BEFORE COMING TO THE CONTROLLER
         @Post('/signup')
                async signUp
                (@Body() signUpDto: SignUpDto): Promise<{token:string}> {
                        return this.authService.signUp(signUpDto)
                };

        @Post('/signin')
                async signin
                (@Body() signInDto: SignInDto): Promise<{token:string}> {
                        return this.authService.signIn(signInDto);
                };


        @UseGuards(jwtGuard)
        @Get('/isjwtvalid')
                async isJwtValid
                (): Promise<Boolean> {
                        return true;
                } 
   

    
}
