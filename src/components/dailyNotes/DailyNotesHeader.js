import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import './DailyNotesHeader.less';
import { connect } from 'react-redux';
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

class DailyNotesHeader extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div
        className="daily-note-header-container"
        style={{ height: this.props.size.height + 'px' }}
      >
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

DailyNotesHeader.propTypes = {
  date: PropTypes.object.isRequired,
  size: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    size: state.layout[DailyNotesHeader.name]
  };
};

export default connect(mapStateToProps)(DailyNotesHeader);
