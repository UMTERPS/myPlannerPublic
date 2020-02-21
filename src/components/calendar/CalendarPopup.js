import React from 'react';
import * as dateActions from '../../redux/actions/dateActions';
import { Calendar } from 'react-calendar';
import { connect } from 'react-redux';
import Proptypes from 'prop-types';
import './CalendarPopup.less';
import { bindActionCreators } from 'redux';

class CalendarPopup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: this.props.date,
      showCalendar: false
    };
    this.updateDate = props.updateDate;
    this.handleCalendarChange = this.handleCalendarChange.bind(this);
  }

  handleCalendarChange = date => {
    this.updateDate(date);
    this.setState({ showCalendar: !this.state.showCalendar, date });
  };

  handleButtonClick = () => {
    this.setState({ showCalendar: !this.state.showCalendar });
  };

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

CalendarPopup.propTypes = {
  date: Proptypes.object.isRequired,
  updateDate: Proptypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    date: state.date.selectedDate
  };
};

const mapDisptchToProps = dispatch => {
  return {
    updateDate: bindActionCreators(dateActions.updateSelectedDate, dispatch)
  };
};

export default connect(mapStateToProps, mapDisptchToProps)(CalendarPopup);
