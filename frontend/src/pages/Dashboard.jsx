import StickyHeadTable from "../components/HomeTable"; 
import DateRangeCalendarCalendarsProp from "../components/HomeCalender";
import Cards from "../components/HomeCard";
import React from 'react';

const Dashboard = () => {
  return (
    <>
      <div className='dashboard-container'>      
        <h1 className='heading'>Dashboard</h1>
        <div className='line'></div>
        <div className='welcome-message'>
          <img src="../images/check.png" alt="Check Icon" />
          <div className="welcome-text">
            <h2>Welcome Shrawani!</h2>
            <h4>Employee post</h4>
          </div>
        </div>
        
        <Cards />
        <StickyHeadTable />
        {/* <DateRangeCalendarCalendarsProp /> */}
      </div>
    </>
  );
};

export default Dashboard;
