import React from "react";
import { Calendar } from "react-calendar";
import "./CalendarPopup.less";

class CalendarPopup extends React.Component {
  state = {
    date: new Date(),
    showCalendar: false
  };

  handleCalendarChange = date => {
    console.log("changed");
    this.setState({ date });
  };

  onClickDay = date => {
    console.log("clicked");
    console.log(date);
    this.setState({ showCalendar: !this.state.showCalendar, date });
  };

  handleButtonClick = () => {
    // console.log(this.state.showCalendar);
    this.setState({ showCalendar: !this.state.showCalendar });
  };

  onBlur() {
    // console.log("blur");
  }
  render() {
    return (
      <div>
        <div className="calendar-popup">
          <div className="popup-button-container">
            <button
              id="popup-button"
              onClick={this.handleButtonClick}
              className="btn btn-sm btn-light"
            >
              Calendar &gt;&gt;
            </button>
          </div>
          <div className="calendar-container">
            {this.state.showCalendar ? (
              <Calendar
                onClickDay={this.onClickDay}
                onChange={this.handleCalendarChange}
                calendarType="US"
                value={this.state.date}
                defaultView="decade"
              />
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

export default CalendarPopup;
