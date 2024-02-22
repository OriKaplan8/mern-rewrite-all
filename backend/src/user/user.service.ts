import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { User } from './user.schema';
import { TurnService } from 'src/turn/turn.service';
import { ProgressDto } from 'src/user/dto/progress.dto';

@Injectable()
export class UserService {
    constructor(
       
        private turnService: TurnService,
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

    async getTurnNum(user) {
        const { userId } = user;
        
        const userDetails: User = await this.userModel.findOne({_id: userId});
        return {
            turn_num: userDetails.progress[2]
        };
    }

    async getDialogNum(user) {
        const { userId } = user;
        
        const userDetails: User = await this.userModel.findOne({_id: userId});
        return {
            dialog_num: userDetails.progress[1]
        };
    }

    async getCurrentUserTurn(user) {
        const progress = await this.userProgress(user);
        return this.turnService.getTurnByBatchDialogTurn(progress)
    }  

    async nextUserTurn(user) {
        const { userId } = user;
        const targetUser = await this.userModel.findOne({_id: userId});
        if (!targetUser || !targetUser.progress || targetUser.progress.length <= 2) {
            console.log("User details not found or progress structure is not as expected.");
            return;
        }
    
        const { batch_num, dialog_num, turn_num } = await this.userProgress(user);
        const dialogLength = await this.turnService.getDialogLenByDialogNum(batch_num, dialog_num);
    
        let updateOperation = {};
    
        // Check if the current turn is less than the total turns in the dialog
        if (turn_num < dialogLength-1) {
            // If so, increment the turn number
            updateOperation = { $inc: { "progress.2": 1 } };
        } else {
            // If not, increment the dialog number and reset the turn number to 1
            updateOperation = { 
                $inc: { "progress.1": 1 }, // Increment dialog_num
                $set: { "progress.2": 1 } // Reset turn_num to 1
            };
        }
    
        // Perform the update
        await this.userModel.updateOne({ _id: userId }, updateOperation);
    
        return this.getCurrentUserTurn(user);
    }
    
    async getCurrentUserDialogTurns(user) {
        const progress = await this.userProgress(user);
        return this.turnService.getAllTurnsByDialogNum(progress.batch_num, progress.dialog_num)
    }  
    



    
}
