import React, { useEffect, useState } from 'react';
// Import axios if you're fetching data from an API
import axios from 'axios';
import SingleUserProgress from './SingleUserProgress';


// If you haven't already, import the interface
interface UserProgress {
    userId: string;
    userName: string;
    progress: number;
}

const GlobalUserProgress = () => {
    const [userProgresses, setUserProgresses] = useState<UserProgress[]>([]); // Typing the state

    useEffect(() => {
        const fetchProgress = async () => {
            try {
                const config = {}; // Replace with your actual config for Axios
                const response = await axios.get('http://localhost:3001/progress/globalProgressAllAnnotators', config);
                setUserProgresses(response.data);
            } catch (error) {
                console.error("Failed to fetch data:", error);
            }
        };

        fetchProgress();
    }, []);

    return (
        <div className="userProgressContainer" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
            {userProgresses.map((userProgress) => (
                <SingleUserProgress key={userProgress.userId} id={userProgress.userId} name={userProgress.userName} progress={userProgress.progress} />
            ))}
        </div>
    );
};

export default GlobalUserProgress;
