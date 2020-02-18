import React from "react";
import "react-calendar/dist/Calendar.css";
import CalendarPopup from "../calendar/CalendarPopup";
import DailyNote from "../dailyNotes/dailyNote";

class ProofOfConceptPage extends React.Component {
  render() {
    return (
      <div>
        <CalendarPopup />
        <DailyNote date={new Date()} />
      </div>
    );
  }
}

export default ProofOfConceptPage;
