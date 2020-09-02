import React, { useCallback } from 'react';
import * as dateActions from '../../../redux/actions/dateActions';
import CalendarPopup from '../calendar/CalendarPopup';
import { useSelector, useDispatch } from 'react-redux';
import './DateNavigation.less';
import Button from 'antd/es/button';
import { DoubleLeftOutlined, DoubleRightOutlined } from '@ant-design/icons';

const DateNavigation = () => {
  const date = useSelector((state: any) => state.date.selectedDate);
  const dispatch = useDispatch();
  const setDate = useCallback(
    data => dispatch(dateActions.updateSelectedDate(data)),
    [dispatch]
  );

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
        <Button id="prev-week" onClick={goPrevWeek} className="btn btn-sm">
          <DoubleLeftOutlined />
        </Button>
      </div>
      <CalendarPopup date={date} setDate={setDate} />
      <div className="date-navi-right">
        <Button id="next-week" onClick={goNextWeek} className="btn btn-sm">
          <DoubleRightOutlined />
        </Button>
      </div>
    </div>
  );
};

export default DateNavigation;
