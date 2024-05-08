import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { User } from './user.schema';

import { ProgressDto } from 'src/user/dto/progress.dto';

@Injectable()
export class UserService {
    constructor(
       
       
        @InjectModel('User') private readonly userModel: Model<User>,
        ) {}

        

    async userProgress(user): Promise<ProgressDto> {
        const { userId } = user;
        
        const userDetails = await this.userModel.findOne({_id: userId});
        return {
            batch_num: userDetails.progress[0],
            dialog_num: userDetails.progress[1],
            turn_num: userDetails.progress[2],
        };
    }

    async getName(user) {
        const { userId } = user; 
        
        const userDetails = await this.userModel.findOne({_id: userId});
        return {
            name: userDetails.name,
        };
    }


  


    
}
