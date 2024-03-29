import api from '../../api';
import Bearer from '../validation/Bearer';
import { GetUser } from '../../../../backend/src/auth/decorator/get-user-decorator';

// Define the structure of the turn data
export type TurnType = {
  _id: string;
  batch_num: number;
  dialog_num: number;
  turn_num: number;
  question_text: string;
  answer_text: string;
  rewrites: string[];
};

export type RewriteAnnotation = {
  score: number;
  optimal: number;
}

export type RequireRewrite = {
  requiresRewrite: number;
}

export type AnnotatorRewrite = {
  annotatorRewrite: string;
}

export type UserProgress = {
  batch_num: number;
  dialog_num: number;
  turn_num: number;
}

class TurnHandler {

  static async getCurrentDialogTurns() : Promise<TurnType[] | null> {
    try {
      const config = Bearer(); // Ensure this returns the correct Axios request config object, including headers
      const response = await api.get<TurnType[]>('/users/currentUserDialogTurns', config);
      return response.data;
    } catch (error) {
      console.error("Failed to fetch data:", error);
      return null;
    }
  }

  
   
  // Method to fetch the current user's turn
  static async getCurrentTurn(): Promise<TurnType | null> {
    try {
      const config = Bearer(); // Ensure this returns the correct Axios request config object, including headers
      const response = await api.get<TurnType>('/users/currentUserTurn', config);
      return response.data;
    } catch (error) {
      console.error("Failed to fetch data:", error);
      return null;
    }
  }

  static async nextTurn() {
      try {
        const config = Bearer(); // Ensure this returns the correct Axios request config object, including headers
        const response = await api.patch<TurnType>('/users/nextUserTurn',{}, config);
        return null
      } catch (error) {
        console.error("Failed to get next turn:", error);
        return null;
      }
  }
  static async saveAnnotation(turnNum: number, rewrite_scores: RewriteAnnotation[] , annotator_rewrite: AnnotatorRewrite, requires_rewrite: RequireRewrite) { 
    const nums = await this.getBatchDialogNums()
    try {
      const config = Bearer(); // Ensure this returns the correct Axios request config object, including headers
      const newbody = {
        batch_num: nums[0],
        dialog_num: nums[1],
        turn_num: turnNum,
        requires_rewrite: requires_rewrite.requiresRewrite,
        annotator_rewrite: annotator_rewrite.annotatorRewrite,
        rewrites_scores: rewrite_scores.map(item => item.score),
        rewrites_optimals: rewrite_scores.map(item => item.optimal),
      }
      
      const response = await api.post('/annotations/annotate', newbody, config);
      
      return null
    } catch (error) {
      console.error("Failed to save annotation", error);
      return error;
    }
      
  }

  static async saveAnnotationRequireRewrite(userProgress: UserProgress, requires_rewrite: number) { 
    
    try {
      const config = Bearer(); // Ensure this returns the correct Axios request config object, including headers
      const newbody = {
        batch_num: userProgress.batch_num,
        dialog_num: userProgress.dialog_num,
        turn_num: userProgress.turn_num,
        requires_rewrite: requires_rewrite,
        annotator_rewrite: 'placeholder',
        rewrites_scores: [-1],
        rewrites_optimals: [-1],
      }
      
      const response = await api.post('/annotations/annotate', newbody, config);
      
      return null
    } catch (error) {
      console.error("Failed to save annotation", error);
      return error;
    }
      
  }

  // Method to return just the rewrites array from the turn data
  static async getDialogRewrites(): Promise<string[][] | null> {
    const dialogTurns = await this.getCurrentDialogTurns();
    if (!dialogTurns) {return null;}

    const dialogRewrites = dialogTurns.map(turn => 
      turn.rewrites
      );
    return dialogRewrites
  }

  // Method to return just the rewrites array from the turn data
  static async getRewrites(): Promise<string[] | null> {
    const currentTurn = await this.getCurrentTurn();
   
    return currentTurn ? currentTurn.rewrites : null;
  }


   // Method to return just the rewrites array from the turn data
  static async getBatchDialogNums(): Promise<(number | null)[]> {
    const currentTurn = await this.getCurrentTurn();
    
    // If currentTurn is null or undefined, return [null, null]
    if (!currentTurn) {
      return [null, null];
    }
    // Otherwise, return the actual batch_num and dialog_num
    return [currentTurn.batch_num, currentTurn.dialog_num];
  }
  // Method to return a formatted string of the question and answer
  static async getFormattedQA(): Promise<string | null> {
    const currentTurn = await this.getCurrentTurn();
    if (!currentTurn) return null;
    
    return `question: ${currentTurn.question_text}\nanswer: ${currentTurn.answer_text}\n--------------\n`;
  }

  static async getTurnNum(): Promise<number | null> {
    try {
      const config = Bearer(); // Ensure this returns the correct Axios request config object, including headers
      const response = await api.get('/users/turnNum', config);
      return response.data.turn_num;
    } catch (error) {
      console.error("Failed to fetch data:", error);
      return null;
    }
  }

  static async getDialogNum(): Promise<number | null> {
    try {
      const config = Bearer(); // Ensure this returns the correct Axios request config object, including headers
      const response = await api.get('/users/dialogNum', config);
      return response.data.dialog_num;
    } catch (error) {
      console.error("Failed to fetch data:", error);
      return null;
    }
  }

  static async getFormattedDialogQA(): Promise<string[] | null> {
    const currentTurns = await this.getCurrentDialogTurns();
    if (!currentTurns) {
      return null
    }
    // Using map to iterate over each turn and format it
    const formattedTurns = currentTurns.map(turn => 
        `question: ${turn.question_text}\nanswer: ${turn.answer_text}\n--------------\n`
    );
    
    return formattedTurns;
  }

  static async GetUserProgress(): Promise<UserProgress | null> {
       try {
        const config = Bearer();
        const response = await api.get('/users/currentUserProgress', config);
        return response.data;
       } catch (error) {
        console.error("Failed to fetch UserProgress: ", error);
        return null
       }
  }
}

export default TurnHandler;
