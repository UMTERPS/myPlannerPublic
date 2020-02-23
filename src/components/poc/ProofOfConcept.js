import React from 'react';
import 'react-calendar/dist/Calendar.css';
import DailyNoteCollection from '../dailyNotes/dailyNoteCollection';

class ProofOfConceptPage extends React.Component {
  render() {
    return (
      <div className="my-planner-container">
        <DailyNoteCollection />
      </div>
    );
  }
}

export default ProofOfConceptPage;
