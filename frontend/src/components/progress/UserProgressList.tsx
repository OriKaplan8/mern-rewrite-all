import React, { useEffect, useState } from 'react';
// Import axios if you're fetching data from an API
import api from '../../api';
import SingleUserProgress from './SingleUserProgress';


// If you haven't already, import the interface
interface UserProgress {
    userId: string;
    userName: string;
    progress: number;
}

const GlobalUserProgress = () => {
    const [userProgresses, setUserProgresses] = useState<UserProgress[]>([]); // Typing the state
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchProgress = async () => {
            try {
                const config = {}; // Replace with your actual config for Axios
                const response = await api.get('/progress/globalProgressAllAnnotators', config);
                setUserProgresses(response.data);
            } catch (error) {
                console.error("Failed to fetch data:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchProgress();
    }, []);

    if (isLoading) {
        return (
            <div style={{ textAlign: 'center' }}> {/* Center the content */}
                <div>Loading...</div>
                <img className='loading' src="https://i.gifer.com/origin/34/34338d26023e5515f6cc8969aa027bca.gif" alt="Loading..." style={{ margin: 'auto' }} />
            </div>
        );
    }
    

    return (
        <div className="userProgressContainer" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
            {userProgresses.map((userProgress) => (
                <SingleUserProgress key={userProgress.userId} id={userProgress.userId} name={userProgress.userName} progress={userProgress.progress} />
            ))}
        </div>
    );
};

export default GlobalUserProgress;
