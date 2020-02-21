import React from 'react';
import PropTypes from 'prop-types';
import DailyNote from './dailyNote';
import DailyNoteHeader from './dailyNoteHeader';
import './dailyNoteCollection.less';
import { connect } from 'react-redux';

const getWeekData = date => {
  let week = new Array();
  // Starting Monday not Sunday
  const _date = getMondayOfWeek(date);
  for (var i = 0; i < 7; i++) {
    week.push(new Date(_date));
    _date.setDate(_date.getDate() + 1);
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
    this.generateDailys = this.generateDailys.bind(this);
  }
  generateDailys() {
    const days = getWeekData(this.props.date);
    const dailys = [];
    days.slice(0, 5).forEach((day, index) => {
      dailys.push(
        <div key={index}>
          <DailyNote date={day} />
        </div>
      );
    });
    dailys.push(
      <div key="weekend-key" className="weekend-row">
        <div key={5} className="column-one">
          <DailyNote date={days[5]} />
        </div>
        <div key={6} className="column-two">
          <DailyNote date={days[6]} />
        </div>
      </div>
    );

    return dailys;
  }

  render() {
    return (
      <div className="daily-collection">
        <DailyNoteHeader date={getMondayOfWeek(this.props.date)} />
        <div>{this.generateDailys()}</div>
      </div>
    );
  }
}

DailyNoteCollection.propTypes = {
  date: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    date: state.date.selectedDate
  };
};

export default connect(mapStateToProps)(DailyNoteCollection);
