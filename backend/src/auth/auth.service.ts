import { HttpException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/user/user.schema';
import { Model } from 'mongoose';

import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './dto/signup.dto';
import { SignInDto } from './dto/signin.dto';
import { ProgressDto } from '../user/dto/progress.dto';

//TODO: READ ON USECONTEXT

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User.name)
        private userModel: Model<User>,
        private jwtService:  JwtService,
    ) {}

    async signUp(signUpDto: SignUpDto): Promise<{ token:string }> {
        const { name, email, password } = signUpDto; 
      
        const exist = await this.userModel.findOne({email})
        if (exist) {
          throw new HttpException({message:['Email already exists']}, 409)
        }

        const hashedPassword = await bcrypt.hash(password, 10);
          
        const user = await this.userModel.create({
          name,
          email,
          password: hashedPassword,
          progress: [1,0,1]
        });
        
    
        return this.signToken(user._id)
      }

    async signIn(signInDto: SignInDto): Promise<{ token:string }> {
      const { email, password } = signInDto;

      const user = await this.userModel.findOne({email})

      if(!user){
        throw new UnauthorizedException('Invalid email or password')
      }

      const isPasswordMatched = await bcrypt.compare(password, user.password)

      if(!isPasswordMatched){
        throw new UnauthorizedException('Invalid email or password')
      }

      const token = this.jwtService.sign({ id: user._id }, {
        secret: process.env.JWT_SECRET || 'your_default_secret_here',
      });
      
    
      return this.signToken(user._id)

    }

    

    async signToken(userId: string): Promise<{token: string}> {
      const payload = {
        id: userId
      }


      const token1 = await this.jwtService.signAsync(payload,
         {expiresIn: process.env.JWT_EXPIRES,
        secret: process.env.JWT_SECRET,})
    
    
    return {
      token: token1
    }
  }
}
