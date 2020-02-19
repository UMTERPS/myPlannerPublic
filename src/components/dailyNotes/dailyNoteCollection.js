import React from "react";
import PropTypes from "prop-types";
import DailyNote from "./dailyNote";
import "./dailyNoteCollection.less";

const getWeekData = date => {
  let week = new Array();
  // Starting Monday not Sunday
  date.setDate(date.getDate() - date.getDay() + 1);
  for (var i = 0; i < 7; i++) {
    week.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }
  return week;
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
      <div className="weekend-row">
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
        <div>{this.generateDailys()}</div>
      </div>
    );
  }
}

DailyNoteCollection.propTypes = {
  date: PropTypes.object.isRequired
};

export default DailyNoteCollection;
