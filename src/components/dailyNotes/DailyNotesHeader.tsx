import React from 'react';
import moment from 'moment';
import './DailyNotesHeader.less';
import { connect } from 'react-redux';
import LayoutIds from '../../../constants/LayoutConstants';
import DateNavigation from '../dateNavigation/DateNavigation';
import { Size } from '../../types/commonTypes';

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

interface DailyNotesHeaderProps {
  date: Date;
  size: Size;
}

const DailyNotesHeader = ({ date, size }: DailyNotesHeaderProps) => {
  return (
    <div
      className="daily-note-header-container"
      style={{ height: size.height + 'px' }}
    >
      <div className="daily-note-header-left">
        <span className="month-title">{monthMap[date.getMonth()]}</span>
        <span className="week-number">
          (week{' '}
          {moment(date)
            .week()
            .toString()}
          )
        </span>
      </div>
      <div className="daily-note-header-center">
        <DateNavigation />
      </div>
      <div className="daily-note-header-right">{date.getFullYear()}</div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    size: state.layout[LayoutIds.DailyNotesHeader]
  };
};

export default connect(mapStateToProps)(DailyNotesHeader);
