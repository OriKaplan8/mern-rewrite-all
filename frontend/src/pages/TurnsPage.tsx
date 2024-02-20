import React, { useState, useEffect } from 'react';
import './pages.css';
import UserCheck from '../components/validation/UserCheck';
import TextBoxTurns from '../components/turns/TextBoxTurns';
import SingleRewrite from '../components/turns/SingleRewrite'; // Import SingleRewriteVisual component
import TurnHandler, { AnnotatorRewrite, RequireRewrite } from '../components/turns/TurnHandler'; // Correctly imported with TurnType
import SingleAnnotatorRewrite from '../components/turns/SingleAnnotatorRewrite';
import SingleRequiresRewrite from '../components/turns/SingleRequiresRewrite';

const Turns = () => {
    UserCheck(); // Check if user is signed in

    const [questionAnswerString, setQuestionAnswerString] = useState('');
    const [questionAnswerStringList, setQuestionAnswerStringList] = useState<string[]>([]);
    const [rewrites, setRewrites] = useState<string[]>([]);
    const [rewritesList, setRewritesList] = useState<string[][]>([]); 
    const [turnNum, setTurnNum] = useState(0);

    const [rewriteFeedback, setRewriteFeedback] = useState<{score: number, optimal: number}[]>([]);


    const [annotatorRewriteFeedback, setAnnotatorRewriteFeedback] = useState<AnnotatorRewrite>({annotatorRewrite:""});
    const [requiresRewriteFeedback, setRequiresRewriteFeedback] = useState<RequireRewrite>({requiresRewrite: -1});

    const [isDataLoaded, setIsDataLoaded] = useState(false);

    // Function to fetch and display turn data and rewrites
    const getTurns = async () => {
        console.log('get some turns');
        const dialogTurns = await TurnHandler.getFormattedDialogQA();
        const dialogRewrites = await TurnHandler.getDialogRewrites();
        const nums = await TurnHandler.getBatchDialogNums();
        const turnNumber = await TurnHandler.getTurnNum();
        console.log(turnNumber)
        
        if (dialogTurns && dialogRewrites && turnNumber) {
            setQuestionAnswerStringList(dialogTurns);
            setRewritesList(dialogRewrites);
            setQuestionAnswerString(dialogTurns[0] || "Turn data is empty.");
            setRewrites(dialogRewrites[0] || []);
            setTurnNum(turnNumber); // Reset turn number to 0
            setIsDataLoaded(true); // Set flag to true since data is loaded
        } else {
            setQuestionAnswerString("Failed to load turn data.");
        }
    };

    const nextTurn = async () => {
        // Check if rewriteFeedback is non-empty and every element has 'score' and 'optimal' fields filled
        const isRewriteFeedbackValid = rewriteFeedback && rewriteFeedback.length > 0 && rewriteFeedback.every(item => item.score !== undefined && item.optimal !== undefined);
    
        if (!isRewriteFeedbackValid || 
            requiresRewriteFeedback.requiresRewrite === -1 || // Adjusted to check for specific unset value
            !annotatorRewriteFeedback.annotatorRewrite) {
            alert("Please fill all fields before proceeding");
        } else {
            const nextTurnIndex = turnNum + 1;
            if (nextTurnIndex < questionAnswerStringList.length) {
                setTurnNum(nextTurnIndex);
                submitFeedback();
    
                // Reset feedback fields here
                setRewriteFeedback([]); // Reset rewrite feedback
                setAnnotatorRewriteFeedback({annotatorRewrite: ""}); // Reset annotator rewrite feedback
                setRequiresRewriteFeedback({requiresRewrite: -1}); // Reset requires rewrite feedback
            } else {
                console.log('next dialog please')
                await submitFeedback();
                //alert("You've reached the end of the turns.");
                getTurns();
                
            }
        }
    };

    // Update turn information when turnNum changes
    useEffect(() => {
        if (questionAnswerStringList.length > 0 && turnNum < questionAnswerStringList.length) {
            let wholestr = '';
            for (let index = 0; index < questionAnswerStringList.length && index <= turnNum; index++) {
            wholestr += '\n' + questionAnswerStringList[index];
            }
                        
            setQuestionAnswerString(wholestr);
        }
        if (rewritesList.length > 0 && turnNum < rewritesList.length) {
            setRewrites(rewritesList[turnNum] || []);
        }
    }, [turnNum, questionAnswerStringList, rewritesList]);

    const submitFeedback = async () => {

        TurnHandler.saveAnnotation(turnNum, rewriteFeedback, annotatorRewriteFeedback, requiresRewriteFeedback);
        await TurnHandler.nextTurn();

    };
    

    return (
        <div className='annotation_container'>
            <h1 className='annotation_container_headline'>Press Load Turns and start Annotating</h1>
            <div className='button-container'>
                <button className='button-container' onClick={getTurns}>Load Turns</button>
            </div>
            <TextBoxTurns dialog_text={questionAnswerString} />
            {isDataLoaded && <SingleRequiresRewrite
                key={`requires-rewrite-${turnNum}`}
                onUpdate={(requiresRewriteText:number)=>{
                    const newFeedback = requiresRewriteText;
                    setRequiresRewriteFeedback({requiresRewrite: newFeedback});
                }}
            />
}
            {rewrites.map((rewrite, index) => (
                <SingleRewrite 
                key={`${turnNum}-${index}`}
                rewrite={rewrite}
                onUpdate= {(score: number, optimal: number) => {
                  const newFeedback = [...rewriteFeedback];
                  newFeedback[index] = {score, optimal};
                  setRewriteFeedback(newFeedback);
                }}
                />
            ))}

            {isDataLoaded && <SingleAnnotatorRewrite
            key={`annotator-rewrite-${turnNum}`}
            onUpdate={(annotatorRewriteText: string) => {
                const newFeedback = annotatorRewriteText;
                setAnnotatorRewriteFeedback({annotatorRewrite: newFeedback});
            }}/> }

            <div className='button-container'>
                <button onClick={nextTurn}>Next</button>
            </div>
        </div>
    );
};

export default Turns;
