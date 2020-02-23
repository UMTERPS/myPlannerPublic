import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import './dailyNoteHeader.less';
import DateNavigation from '../dateNavigation/DateNavigation';

const monthMap = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'Septempber',
  'October',
  'November',
  'December'
];

class DailyNoteHeader extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="daily-note-header-container">
        <div className="daily-note-header-left">
          <span className="month-title">
            {monthMap[this.props.date.getMonth()]}
          </span>
          <span className="week-number">
            (week{' '}
            {moment(this.props.date)
              .week()
              .toString()}
            )
          </span>
        </div>
        <div className="daily-note-header-center">
          <DateNavigation />
        </div>
        <div className="daily-note-header-right">
          {this.props.date.getFullYear()}
        </div>
      </div>
    );
  }
}

DailyNoteHeader.propTypes = {
  date: PropTypes.object.isRequired
};

export default DailyNoteHeader;
