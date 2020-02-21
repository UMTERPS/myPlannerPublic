import React from 'react';
import PropTypes from 'prop-types';
import DailyNote from './dailyNote';
import DailyNoteHeader from './dailyNoteHeader';
import './dailyNoteCollection.less';

const getWeekData = date => {
  let week = new Array();
  // Starting Monday not Sunday
  const _date = getMondayOfWeek(date);
  for (var i = 0; i < 7; i++) {
    week.push(new Date(_date));
    _date.setDate(date.getDate() + 1);
  }
  return week;
};

const getMondayOfWeek = date => {
  const _date = new Date(date);
  _date.setDate(date.getDate() - date.getDay() + 1);
  return _date;
};

class DailyNoteCollection extends React.Component {
  constructor(props) {
    super(props);
  }
  generateDailys() {
    const days = getWeekData(new Date());
    const dailys = [];
    days.slice(0, 5).forEach((day, index) => {
      dailys.push(
        <div key={index}>
          <DailyNote date={day} />
        </div>
      );
    });
    dailys.push(
      <div key='weekend-key' className='weekend-row'>
        <div key={5} className='column-one'>
          <DailyNote date={days[5]} />
        </div>
        <div key={6} className='column-two'>
          <DailyNote date={days[6]} />
        </div>
      </div>
    );

    return dailys;
  }

  render() {
    return (
      <div className='daily-collection'>
        <DailyNoteHeader currentDate={getMondayOfWeek(this.props.date)} />
        <div>{this.generateDailys()}</div>
      </div>
    );
  }
}

DailyNoteCollection.propTypes = {
  date: PropTypes.object.isRequired
};

export default DailyNoteCollection;
