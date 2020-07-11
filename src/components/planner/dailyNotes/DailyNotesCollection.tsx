import React, { ReactNode } from 'react';
import DailyNote from './DailyNote';
import './DailyNotesCollection.less';
import { useSelector } from 'react-redux';
import { getDailyData } from '../../../services/DateUtilService';

const DailyNotesCollection = () => {
  const date = useSelector((state: any) => state.date.selectedDate );
  const generateDailys = () => {
    const days = getDailyData(date);
    const dailys: ReactNode[] = [];
    days.slice(0, 5).forEach((day, index) => {
      dailys.push(
        <div key={index}>
          <DailyNote date={day.date} uid={index.toString()} />
        </div>
      );
    });

    dailys.push(
      <div key="weekend-key" className="weekend-row">
        <div key={5} className="column-one">
          <DailyNote date={days[5].date} uid={'5'} />
        </div>
        <div key={6} className="column-two">
          <DailyNote date={days[6].date} uid={'6'} />
        </div>
      </div>
    );

    return dailys;
  };

  return (
    <div className="daily-collection">
      <div>{generateDailys()}</div>
    </div>
  );
};

export default DailyNotesCollection;
