import React, { useState } from 'react'

interface SingleAnnotatorRewriteProps {
    onUpdate: (annotator_rewrite_text: string) => void;
};

const SingleAnnotatorRewrite: React.FC<SingleAnnotatorRewriteProps> = ({onUpdate}) => {
    const [annotatorRewriteText, setAnnotatorRewriteText] = useState('');

    
    
    return (
    <div className='single-rewrite-container'>
            <div className='rewrite-field'>Annotator Rewrite</div>
            <input className='annotator-rewrite-text' 
            type="text-wide"
            placeholder='Your Rewrite...'
            value={annotatorRewriteText}
            onChange={(e) => {
                setAnnotatorRewriteText(e.target.value)
                onUpdate(e.target.value)
            }}
            />
        
      
    </div>
  )
}

export default SingleAnnotatorRewrite
