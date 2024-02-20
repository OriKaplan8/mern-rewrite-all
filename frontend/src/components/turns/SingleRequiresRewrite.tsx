import React, { useState } from 'react'

interface SingleRequiresRewriteProps {
    onUpdate: (requiresRewriteText: number) => void;
};

const SingleRequiresRewrite: React.FC<SingleRequiresRewriteProps> = ({onUpdate}) => {
    const [requiresRewrite, setRequiresRewrite] = useState<number | undefined>(undefined)


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = parseInt(e.target.value, 10);

        if (newValue === 0 || newValue === 1) {
            setRequiresRewrite(newValue)
            onUpdate(newValue);
        } else {
            setRequiresRewrite(undefined);
            onUpdate(-1)
        }
    }
  
    return (
    <div className='single-rewrite-container'>
        <div className='rewrite-field'>Requires Rewrites</div>
        <input className='annotator-rewrite-text'
        type='text-wide'
        placeholder='does the question requires a rewrite? (0 or 1)'
        value={requiresRewrite === undefined ? '':requiresRewrite}
        onChange={handleChange}
                min="0" // Set minimum value
                max="1" // Set maximum value
        />
    </div>
  )
}

export default SingleRequiresRewrite
