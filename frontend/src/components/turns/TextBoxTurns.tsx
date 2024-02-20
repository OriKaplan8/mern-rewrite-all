import React, { useEffect, useRef, useState } from 'react';

const TextBoxTurns = ({ dialog_text }: { dialog_text: string }) => {
    const [text, setText] = useState(dialog_text);
    const textBoxRef = useRef<HTMLTextAreaElement>(null); // Specify the type for TypeScript

    useEffect(() => {
        setText(dialog_text);

        // Ensure the current ref points to a DOM element
        if (textBoxRef.current) {
            const textBoxElement = textBoxRef.current;
            // Scroll to the bottom
            textBoxElement.scrollTop = textBoxElement.scrollHeight;
        }
    }, [dialog_text]); // Only re-run the effect if dialog_text changes

    return (
        <div>
            <textarea readOnly className='textbox-turns'
                ref={textBoxRef} // Associate the ref with the textarea element
                value={text}
                placeholder='Turns Appear here'
                rows={4}
                cols={50}
            />
        </div>
    );
}

export default TextBoxTurns;
