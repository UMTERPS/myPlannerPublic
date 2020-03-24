import * as React from 'react';
import 'react-calendar/dist/Calendar.css';
import DailyNotesPanel from './dailyNotes/DailyNotesPanel';
import WeeklyNotesPanel from './weeklyNote/WeeklyNotesPanel.tsx';
import './App.less';

class App extends React.Component<any, any> {
  public render(): React.ReactNode {
    return (
      <div className="my-planner-container" id="my-plainer-container-id">
        <DailyNotesPanel />
        <WeeklyNotesPanel />
      </div>
    );
  }
}

export default App;
