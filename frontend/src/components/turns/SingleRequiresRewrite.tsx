import React, { forwardRef, useImperativeHandle, useRef, useState } from 'react';

interface SingleRequiresRewriteProps {
  onUpdate: (requiresRewriteText: number) => void;
}

// Define a type for the ref's current object
export interface SingleRequiresRewriteHandles {
  focus: () => void;
}

const SingleRequiresRewrite = forwardRef<SingleRequiresRewriteHandles, SingleRequiresRewriteProps>(
  ({ onUpdate }, ref) => {
    const [requiresRewrite, setRequiresRewrite] = useState<number | undefined>(undefined);
    const inputRef = useRef<HTMLInputElement>(null); // Internal ref to the input element

    // Expose specific properties and methods to the parent component
    useImperativeHandle(ref, () => ({
      focus: () => {
        inputRef.current?.focus();
      },
    }));

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = parseInt(e.target.value, 10);
      if (!isNaN(newValue) && (newValue === 0 || newValue === 1)) {
        setRequiresRewrite(newValue);
        onUpdate(newValue);
      } else {
        setRequiresRewrite(undefined);
        onUpdate(-1);
      }
    };

    return (
      <div className='single-rewrite-container'>
        <div className='rewrite-field'>Requires Rewrites</div>
        <input
          ref={inputRef} // Use the internal ref here
          className='annotator-rewrite-text'
          type="text-wide"
          placeholder='Does the question require a rewrite? (0 or 1)'
          value={requiresRewrite === undefined ? '' : requiresRewrite}
          onChange={handleChange}
          min="0"
          max="1"
        />
      </div>
    );
  }
);

export default SingleRequiresRewrite;
