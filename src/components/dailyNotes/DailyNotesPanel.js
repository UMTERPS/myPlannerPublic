import React from 'react';
import PropTypes from 'prop-types';
import DailyNotesHeader from './DailyNotesHeader';
import DailyNotesCollection from './DailyNotesCollection';
import LayoutIds from '../../../constants/LayoutConstants';
import './DailyNotesPanel.less';
import { connect } from 'react-redux';

const getMondayOfWeek = date => {
  const _date = new Date(date);
  _date.setDate(date.getDate() - date.getDay() + 1);
  return _date;
};

class DailyNotesPanel extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div
        className="daily-panel"
        style={{ width: this.props.size.width + 'px' }}
      >
        <DailyNotesHeader date={getMondayOfWeek(this.props.date)} />
        <DailyNotesCollection date={this.props.date} />
      </div>
    );
  }
}

DailyNotesPanel.propTypes = {
  date: PropTypes.object.isRequired,
  size: PropTypes.object
};

const mapStateToProps = state => {
  return {
    date: state.date.selectedDate,
    size: state.layout[LayoutIds.DailyNotesPanel]
  };
};

export default connect(mapStateToProps)(DailyNotesPanel);
