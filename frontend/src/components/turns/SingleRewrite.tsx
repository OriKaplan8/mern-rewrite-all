import React, { useState, useImperativeHandle, forwardRef } from 'react';

interface SingleRewriteProps {
  rewrite: string;
  onUpdate: (score: number, optimal: number) => void;
}

// Change the component to use forwardRef
const SingleRewrite = forwardRef((props: SingleRewriteProps, ref) => {
  const { rewrite, onUpdate } = props;
  const [score, setScore] = useState<number | undefined>(undefined);
  const [optimal, setOptimal] = useState<number | undefined>(undefined);

  // Use useImperativeHandle to expose the reset function
  useImperativeHandle(ref, () => ({
    resetFields() {
      setScore(undefined);
      setOptimal(undefined);
    }
  }));

  // Handle changes to the score
  const handleScoreChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value, 10);
    if (newValue >= 1 && newValue <= 9) {
      setScore(newValue);
      onUpdate(newValue, optimal ?? 0); // Use existing optimal value or default to 0 if undefined
    } else {
      setScore(undefined);
      onUpdate(-1, optimal ?? 0);
    }
  };

  // Handle changes to the optimal field
  const handleOptimalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value, 10);
    if (newValue === 0 || newValue === 1) {
      setOptimal(newValue);
      onUpdate(score ?? -1, newValue); // Use existing score value or default to -1 if undefined
    } else {
      setOptimal(undefined);
      onUpdate(score ?? -1, -1);
    }
  };

  return (
    <div className="single-rewrite-container">
      <div className="rewrite-text">{rewrite}</div>
      <input
        type="text"
        placeholder="Score (1-9)"
        value={score === undefined ? '' : score}
        onChange={handleScoreChange}
        min="1"
        max="9"
      />
      <input
        type="text"
        placeholder="Optimal (0 or 1)"
        value={optimal === undefined ? '' : optimal}
        onChange={handleOptimalChange}
        min="0"
        max="1"
      />
    </div>
  );
});

export default SingleRewrite;
