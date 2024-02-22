import React from 'react'


interface ProgressProps {
    batchNumber: number;
    dialogNumber: number;
    turnNumber: number;
}

const ShowProgress = (progressProps: ProgressProps) => {
  return (
    <div className='progressContainer'>
      <p className='progressDigit'> Batch: {progressProps.batchNumber} </p>
      <p className='progressDigit'> Dialog: {progressProps.dialogNumber} </p>
      <p className='progressDigit'> Turn: {progressProps.turnNumber} </p>
    </div>
  )
}

export default ShowProgress 
