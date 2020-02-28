import React from 'react';
import PropTypes from 'prop-types';
import DailyNotesHeader from './DailyNotesHeader';
import DailyNotesCollection from './DailyNotesCollection';
import './DailyNotesPanel.less';
import { connect } from 'react-redux';

const getMondayOfWeek = date => {
  const _date = new Date(date);
  _date.setDate(date.getDate() - date.getDay() + 1);
  return _date;
};

const HEADER_HEIGHT = 40;

class DailyNotesPanel extends React.Component {
  constructor(props) {
    super(props);
    this.getHeaderSize = this.getHeaderSize.bind(this);
    this.getDailyNotesCollectionSize = this.getDailyNotesCollectionSize.bind(
      this
    );
  }

  getHeaderSize() {
    return {
      width: this.props.size.width,
      height: HEADER_HEIGHT
    };
  }

  getDailyNotesCollectionSize() {
    return {
      width: this.props.size.width,
      height: this.props.size.height - HEADER_HEIGHT
    };
  }

  render() {
    return (
      <div className="daily-panel">
        <DailyNotesHeader
          date={getMondayOfWeek(this.props.date)}
          size={this.getHeaderSize()}
        />
        <DailyNotesCollection
          size={this.getDailyNotesCollectionSize()}
          date={this.props.date}
        />
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
    date: state.date.selectedDate
  };
};

export default connect(mapStateToProps)(DailyNotesPanel);
