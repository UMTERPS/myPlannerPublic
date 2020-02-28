import React from 'react';
import PropTypes from 'prop-types';
import DailyNote from './DailyNote';
import './DailyNotesCollection.less';
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

class DailyNotesCollection extends React.Component {
  constructor(props) {
    super(props);
    this.generateDailys = this.generateDailys.bind(this);
    this.getDailyNoteSize = this.getDailyNoteSize.bind(this);
  }

  getDailyNoteSize(weekendRow = false) {
    return {
      width: weekendRow ? this.props.size.width / 2 : this.props.size.width,
      height: this.props.size.height / 6
    };
  }

  generateDailys() {
    const days = getWeekData(this.props.date);
    const dailys = [];
    days.slice(0, 5).forEach((day, index) => {
      dailys.push(
        <div key={index}>
          <DailyNote date={day} size={this.getDailyNoteSize()} />
        </div>
      );
    });

    dailys.push(
      <div key="weekend-key" className="weekend-row">
        <div key={5} className="column-one">
          <DailyNote date={days[5]} size={this.getDailyNoteSize(true)} />
        </div>
        <div key={6} className="column-two">
          <DailyNote date={days[6]} size={this.getDailyNoteSize(true)} />
        </div>
      </div>
    );

    return dailys;
  }

  render() {
    return (
      <div className="daily-collection">
        <div>{this.generateDailys()}</div>
      </div>
    );
  }
}

DailyNotesCollection.propTypes = {
  date: PropTypes.object.isRequired,
  size: PropTypes.object
};

const mapStateToProps = state => {
  return {
    date: state.date.selectedDate
  };
};

export default connect(mapStateToProps)(DailyNotesCollection);
