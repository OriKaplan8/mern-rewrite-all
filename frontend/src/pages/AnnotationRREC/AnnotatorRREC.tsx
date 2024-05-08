import React, { useState } from 'react';

const AnnotationRREC = () => {
    const [text, setText] = useState('');
    const [choice1, setChoice1] = useState('');
    const [choice2, setChoice2] = useState('');

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
        </div>
    );
};

export default AnnotationRREC;