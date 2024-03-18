import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AnnotationService } from 'src/annotation/annotation.service';
import { TurnService } from 'src/turn/turn.service';
import { User } from 'src/user/user.schema';

@Injectable()
export class ProgressService {
    constructor(
        private turnService: TurnService,
        private annotationService: AnnotationService,
        @InjectModel('User') private readonly userModel: Model<User>,
    ) {}



    async globalProgress(userId: string) {
        const userDetails = await this.userModel.findOne({_id: userId});
        const countAllTurns: object[] = (await this.turnService.getAllTurns())
        const AnnotationByUser: object[] = await this.annotationService.getAnnotationsById(userId)
        return AnnotationByUser.length / countAllTurns.length;
    }

    async globalProgressForAllAnnotators() {
        // First, get all user IDs from the userModel
        const users = await this.userModel.find({}, { _id: 1, name: 1 }); // Select only the _id field
    
        // Get the total number of turns only once, as this is constant for all users
        const countAllTurns = (await this.turnService.getAllTurns()).length;
        if (countAllTurns === 0) return []; // Return an empty array or appropriate response if no turns are found
    
        // Initialize an array to hold the progress of all users
        let allUsersProgress = [];
    
        // Loop through each user and calculate their progress
        for (let user of users) {
            const userId = user._id;
            const userName = user.name;
            const annotationsByUser = await this.annotationService.getAnnotationsById(userId.toString());
            const userProgress = {
                userId: userId,
                userName: user.name, 
                progress: annotationsByUser.length / countAllTurns
            };
            // Add the user's progress to the array
            allUsersProgress.push(userProgress);
        }
    
        // Return the array containing all users' progress
        return allUsersProgress;
    }
    
}
