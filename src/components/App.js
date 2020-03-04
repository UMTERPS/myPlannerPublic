import React from 'react';
import 'react-calendar/dist/Calendar.css';
import DailyNotesPanel from '../components/dailyNotes/DailyNotesPanel';
import WeeklyNotesPanel from './weeklyNote/WeeklyNotesPanel';
import './App.less';

class App extends React.Component {
  render() {
    return (
      <div className="my-planner-container" id="my-plainer-container-id">
        <DailyNotesPanel />
        <WeeklyNotesPanel />
      </div>
    );
  }
}

export default App;
