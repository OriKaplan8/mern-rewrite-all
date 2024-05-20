import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { findFirstEmptyTurn } from './AnnotatorRREC.functions';

interface JsonData {
    json_data: any;
    [key: string]: any;
}

const AnnotationRREC: React.FC = () => {
    const [text, setText] = useState('');
    const [choice1, setChoice1] = useState('');
    const [choice2, setChoice2] = useState('');

    const location = useLocation();
    const locationState = location.state as {jsonData?: JsonData} | undefined;
    

    useEffect(() => {
        if (locationState && locationState.jsonData) {
            setText(JSON.stringify(locationState.jsonData, null, 2)); // Pretty-print JSON with 2-space indentation
        }
    }, [locationState]);

    if (!locationState || !locationState.jsonData) {
        return <div>No JSON data found in location state.</div>;
    }

    

    const jsonData = locationState.jsonData;

    const handleFindFirstEmptyTurn = async () => {
        try {
            const parsedJson: JsonData = JSON.parse(text);
            const firstEmptyTurnKey = await findFirstEmptyTurn(parsedJson);
            console.log(`First empty turn key: ${firstEmptyTurnKey}`);
        } catch (error) {
            console.error('Invalid JSON format or structure:', error);
        }
    };
   

    const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setText(event.target.value);
    };

    const handleChoice1Change = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setChoice1(event.target.value);
    };

    const handleChoice2Change = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setChoice2(event.target.value);
    };

    return (
        <div>
            <textarea value={text} onChange={handleTextChange} rows={5} cols={50} />
            <div>
                <label>
                    Choice 1:
                    <select value={choice1} onChange={handleChoice1Change}>
                        <option value="Option 1">Option 1</option>
                        <option value="Option 2">Option 2</option>
                    </select>
                </label>
            </div>
            <div>
                <label>
                    Choice 2:
                    <select value={choice2} onChange={handleChoice2Change}>
                        <option value="Option A">Option A</option>
                        <option value="Option B">Option B</option>
                    </select>
                </label>
            </div>

            <button onClick={() => handleFindFirstEmptyTurn}>Find first empty turn</button>
        </div>
    );
};

export default AnnotationRREC;