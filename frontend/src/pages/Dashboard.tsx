import React from 'react';
import GlobalUserProgress from '../components/progress/UserProgressList';
const Dashboard = () => {
  return (
    <div className='homePageContainer'>
        <h1>Welcome to Annotators' Dashboard</h1>
        <h2>Here you'll be able to see annotators' progress in live</h2>
        <br/>
        <h3>
          You can see how each annotator is doing and implement statistics to get more insights.
        </h3>
        <h1>This page will be accessible for admins only.</h1>
        
        {/* Include the GlobalUserProgress component here */}
        <GlobalUserProgress />
    </div>
  );
};

export default Dashboard;
