import React from 'react';
import * as dateActions from '../../redux/actions/dateActions';
import { bindActionCreators } from 'redux';
import CalendarPopup from '../calendar/CalendarPopup';
import { connect } from 'react-redux';
import './DateNavigation.less';

interface IDateNavigationProps {
  date: Date;
  setDate: Function;
}

const DateNavigation = ({ date, setDate }: IDateNavigationProps) => {
  const goPrevWeek = () => {
    const _date = new Date(date);
    _date.setDate(date.getDate() - 7);
    setDate(_date);
  };

  const goNextWeek = () => {
    const _date = new Date(date);
    _date.setDate(date.getDate() + 7);
    setDate(_date);
  };

  return (
    <div className="date-navi-header">
      <div className="date-navi-left">
        <button id="prev-week" onClick={goPrevWeek} className="btn btn-sm">
          &lt;&lt;
        </button>
      </div>
      <CalendarPopup date={date} setDate={setDate} />
      <div className="date-navi-right">
        <button id="next-week" onClick={goNextWeek} className="btn btn-sm">
          &gt;&gt;
        </button>
      </div>
    </div>
  );
};

const mapStateToProps: any = (state: any): any => {
  return {
    date: state.date.selectedDate
  };
};

const mapDisptchToProps: any = (dispatch: any) => {
  return {
    setDate: bindActionCreators(dateActions.updateSelectedDate, dispatch)
  };
};

export default connect(mapStateToProps, mapDisptchToProps)(DateNavigation);
