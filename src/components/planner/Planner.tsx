import React from 'react';
import DailyNotesPanel from './dailyNotes/DailyNotesPanel';
import WeeklyNotesPanel from './weeklyNote/WeeklyNotesPanel';
import './Planner.less';

const Planner = () => {
  return (
    <div className="my-planner-container" id="my-plainer-container-id">
      <DailyNotesPanel />
      <WeeklyNotesPanel />
    </div>
  );
};

export default Planner;
