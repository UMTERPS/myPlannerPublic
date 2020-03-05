import React from 'react';
import { Calendar } from 'react-calendar';
import moment from 'moment';
import Proptypes from 'prop-types';
import './CalendarPopup.less';

class CalendarPopup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showCalendar: false,
      date: props.date
    };
    this.setDate = props.setDate;
    this.handleCalendarChange = this.handleCalendarChange.bind(this);
    this.generateBackToTodayButton = this.generateBackToTodayButton.bind(this);
    this.goBackToToday = this.goBackToToday.bind(this);
  }

  goBackToToday() {
    this.setDate(new Date());
  }

  handleCalendarChange(date) {
    this.setDate(date);
    this.setState({ date });
  }

  toggleCalendar(event) {
    if (
      event.target.id === 'popup-button' ||
      event.target.id === 'calendar-popup-container-id'
    ) {
      this.setState({ showCalendar: !this.state.showCalendar });
    }
  }

  generateBackToTodayButton() {
    if (this.state.showCalendar && !moment().isSame(this.props.date, 'day')) {
      return (
        <div className="go-today-container">
          <button className="btn">Back to today</button>
        </div>
      );
    }
  }

  render() {
    return (
      <div className="calendar-popup" id="calendar-popup-id">
        <div className="popup-button-container">
          <button
            id="popup-button"
            onClick={this.toggleCalendar}
            className="btn btn-sm btn-light"
          >
            Calendar
          </button>
        </div>
        {this.state.showCalendar ? (
          <div
            className="calendar-modal-background"
            id="calendar-popup-container-id"
            onClick={this.toggleCalendar}
          >
            <div className="calendar-container">
              <Calendar
                onChange={this.handleCalendarChange}
                calendarType="US"
                value={this.props.date}
                defaultView="decade"
              />
              <div className="go-today-container">
                {!moment().isSame(this.props.date, 'day') ? (
                  <button
                    className="btn btn-sm btn-outline-dark go-today-button"
                    onClick={this.goBackToToday}
                  >
                    Back to today
                  </button>
                ) : null}
              </div>
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}

CalendarPopup.propTypes = {
  date: Proptypes.object.isRequired,
  setDate: Proptypes.func.isRequired
};

export default CalendarPopup;
