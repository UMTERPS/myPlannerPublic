import React from "react";
import "react-calendar/dist/Calendar.css";
import CalendarPopup from "../calendar/CalendarPopup";
import DailyNoteCollection from "../dailyNotes/dailyNoteCollection";

class ProofOfConceptPage extends React.Component {
  render() {
    return (
      <div>
        {/* <CalendarPopup /> */}
        <DailyNoteCollection date={new Date()} />
      </div>
    );
  }
}

export default ProofOfConceptPage;
