import React, { useEffect, useRef, useState } from 'react'
import TurnHandler from '../components/turns/TurnHandler';
import { UserProgress } from '../components/turns/TurnHandler';
import ShowProgress from '../components/turns/ShowProgress';
import SingleRequiresRewrite, { SingleRequiresRewriteHandles } from '../components/turns/SingleRequiresRewrite';
import TextBoxTurns from '../components/turns/TextBoxTurns';

const RequiresRewritePage = () => {
  //Progress Indicators
  const [userProgress, setUserProgress] = useState<UserProgress>({batch_num: -1, dialog_num: -1, turn_num: -1});

  //Dialog Question
  const [questionAnswerString, setQuestionAnswerString] = useState('');
  const [questionAnswerStringList, setQuestionAnswerStringList] = useState<string[]>([]);

  //Annotator Feedback
  const [requiresRewriteFeedback, setRequiresRewriteFeedback] = useState<number>(-1);

  //Check State
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  //RequireRewrite Entry Ref
  const rewriteRef = useRef<SingleRequiresRewriteHandles>(null);

  const focusOnInput = () => {
    rewriteRef.current?.focus();
  };

  //GetProgress
  const getProgress = async () => {
    const progress: UserProgress | null = await TurnHandler.GetUserProgress();
    if (progress !== null) setUserProgress(progress);
  };

  //Function for getting the questions to show from the user progress
  const getQuestions = async () => {
    console.log('Loading Turns')
    try{
      await getProgress()
      const dialogQuestions = await TurnHandler.getFormattedDialogQA();
      if (dialogQuestions){ 
        setIsDataLoaded(true);
        setQuestionAnswerStringList(dialogQuestions);}
      else throw new Error("dialog question returned a null object");

    } catch (error: any) {
      console.error(error.message);
      setQuestionAnswerString("Failed to load data");
    }
  }

  const sumbitFeedback = async () => {
    try {
    TurnHandler.saveAnnotationRequireRewrite(userProgress, requiresRewriteFeedback); }
    catch (error: any) {
      throw new Error("Failed to update database with annotation")
    }
  }

  const IncreaseUserProgress = () => {
    if (userProgress.turn_num < questionAnswerStringList.length - 1) userProgress.turn_num ++ ;
    else (setUserProgress({batch_num: userProgress.batch_num, dialog_num: userProgress.dialog_num, turn_num: 0}))
  }

  const nextTurn = async () => {
    if ((requiresRewriteFeedback === -1)) {
        alert("Please fill all fields before proceeding");
    } else {
      sumbitFeedback();
      IncreaseUserProgress();
      setRequiresRewriteFeedback(-1);
      console.log(`Moving to next turn [${userProgress.turn_num}|${userProgress.dialog_num}|${userProgress.batch_num}]`);
      focusOnInput()
    }
  }
  

  useEffect(() => {
    if (isDataLoaded){
      console.log("Updating dialog box")
      if (questionAnswerStringList.length > 0 && userProgress.turn_num < questionAnswerStringList.length) {
        let dialogString = "";
        for (let index = 0; index < questionAnswerStringList.length && index < userProgress.turn_num; index++) {
          dialogString += "\n" + questionAnswerStringList[index];
        }
        setQuestionAnswerString(dialogString);
      }

      focusOnInput()

    }
    
  }, [userProgress.turn_num, questionAnswerStringList])
  






  return (
    <div className='annotation_container'>
     {isDataLoaded && <ShowProgress batchNumber={userProgress.batch_num} turnNumber={userProgress.turn_num} dialogNumber={userProgress.dialog_num} />}
            <h1 className='annotation_container_headline'>Press Load Turns and start Annotating</h1>
            <div className='button-container'>
                <button className='button-container' onClick={getQuestions}>Load Turns</button>
            </div>

            <TextBoxTurns dialog_text={questionAnswerString} />


      {isDataLoaded && <SingleRequiresRewrite
          ref={rewriteRef}
          key={`requires-rewrite-${userProgress.turn_num}`}
          onUpdate={(requiresRewriteText:number)=>{
              const newFeedback = requiresRewriteText;
              setRequiresRewriteFeedback(newFeedback);
          }}/>
      }

      <div className='button-container'>
      <button onClick={nextTurn}>Next</button>       
      </div>

      
     

    </div>
  )
}

export default RequiresRewritePage