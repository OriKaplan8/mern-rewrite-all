import React from 'react';

interface UserProgressProps {
    name: string;
    id: string;
    progress: number;
}

const SingleUserProgress: React.FC<UserProgressProps> = ({ name, progress }) => {
    // Calculate percentage for better control in styling
   
    const radius = 50; // Radius of the circle
    const circumference = 2 * Math.PI * radius; // Circumference of the circle
    const strokeVal = progress * circumference; // How much of the circle should be filled


    return (
        <div className="user-card" style={{ margin: '10px', padding: '20px', display: 'inline-block', textAlign: 'center' }}>
            <h5 className="userName" style={{ marginBottom: '20px' }}>{name}</h5>
            <svg width="120" height="120" viewBox="0 0 120 120">
                <circle cx="60" cy="60" r={radius} strokeWidth="10" stroke="#e6e6e6" fill="transparent"/>
                <circle cx="60" cy="60" r={radius} strokeWidth="10" stroke="green" fill="transparent" strokeDasharray={circumference} strokeDashoffset={circumference - strokeVal} transform="rotate(-90 60 60)"/>
                <text x="50%" y="50%" textAnchor="middle" dy=".3em" fontSize="20">{`${Math.round(progress * 100)}%`}</text>
            </svg>
        </div>
    );
};

export default SingleUserProgress;
