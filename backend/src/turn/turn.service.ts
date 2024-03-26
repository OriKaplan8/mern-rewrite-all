import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel} from '@nestjs/mongoose'
import { Model } from 'mongoose';
import { Turn } from './schemas/turn.schema';
import { EmptyError } from 'rxjs';
import { ExceptionsHandler } from '@nestjs/core/exceptions/exceptions-handler';
import { TurnDto } from './dto/turn.dto';
import { AuthService } from 'src/auth/auth.service';
import { ProgressDto } from 'src/user/dto/progress.dto';
import { User } from 'src/user/user.schema';



@Injectable()
export class TurnService {
    constructor(
        private authService: AuthService,
        @InjectModel('Turn') private readonly turnModel: Model<Turn>,

        ) {}
    
    async insertTurn(turnDto: TurnDto) {
        const { batch_num, dialog_num, turn_num, question_text, answer_text, rewrites } = turnDto;
        
        try {
            const newTurn = await this.turnModel.create({
                batch_num: batch_num,
                dialog_num,
                turn_num,
                question_text,
                answer_text,
                rewrites: [
                    rewrites[0],
                    rewrites[1],
                    rewrites[2],
                    rewrites[3],
                ]
                
            });
            return newTurn.toObject(); // Use toObject() if you want to manipulate or log the result
        } catch (error) {
            throw new Error(`Error creating new turn: ${error.message}`);
        }
    }
    

    async getAllTurnsByDialogNum(batch_num: number, dialog_num: number) {
        const turns = await this.turnModel.find({batch_num:batch_num,dialog_num: dialog_num}).exec();

        if (!turns) {
            throw new NotFoundException('Dialog Not Exist')
        }
        
        return turns.map((turn) => turn.toObject());
    }

    async getDialogLenByDialogNum(batch_num: number, dialog_num: number) {
        const turns = await this.turnModel.find({batch_num:batch_num,dialog_num: dialog_num}).exec();

        if (!turns) {
            throw new NotFoundException('Dialog Not Exist')
        }
        
        return turns.length
    }

    async getBatchLenByDialogNum(batch_num: number) {
        const uniqueDialogs = await this.turnModel.aggregate([
            { $match: { batch_num: batch_num } }, // Ensure this matches the type in your DB
            { $group: { _id: "$dialog_num" } }, // Group by dialog_num
            { $count: "uniqueDialogCount" } // Count unique dialog_num values
        ]);
    
        if (!uniqueDialogs.length) {
            throw new NotFoundException('No unique dialog numbers found for the specified batch.');
        }
    
        return uniqueDialogs[0].uniqueDialogCount;
    }
    
    

    async getTurnByBatchDialogTurn(progressDto: ProgressDto) {
        
        const found_turn = await this.turnModel.findOne({
            batch_num: progressDto.batch_num,
            dialog_num: progressDto.dialog_num,
            turn_num: progressDto.turn_num 
        }).exec();

        if (!found_turn) {
            throw new NotFoundException('cannot find turn')
        }
        
        return found_turn;
    }

    

    async getAllTurns() {
        const turns = await this.turnModel.find().exec();
    
        if (!turns || turns.length === 0) {
            throw new NotFoundException('No Turns in Dataset');
        }
        return turns; 
    }


    getUserCurrentBatch(user: User) {
        console.log(user)
    }

    addBatch(file: any) {

        return "hello";
    }
  
   
        



}

