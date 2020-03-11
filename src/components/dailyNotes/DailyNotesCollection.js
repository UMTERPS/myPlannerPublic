import React from 'react';
import PropTypes from 'prop-types';
import DailyNote from './DailyNote';
import './DailyNotesCollection.less';
import { connect } from 'react-redux';
import LayoutIds from '../../../constants/LayoutContants';
import { getDailyData } from '../../services/DateUtilService';
import { bindActionCreators } from 'redux';
import { fetchAllDailyNotes } from '../../redux/actions/notesActions';
import moment from 'moment';

class DailyNotesCollection extends React.Component {
  constructor(props) {
    super(props);
    this.generateDailys = this.generateDailys.bind(this);
  }

  shouldComponentUpdate(nextProps) {
    if (!moment(nextProps.date).isSame(this.props.date)) {
      this.props.fetchAllDailyNotes(nextProps.date);
    }
    return true;
  }

  componentDidMount() {
    this.props.fetchAllDailyNotes(this.props.date);
  }

  generateDailys() {
    const days = getDailyData(this.props.date);
    const dailys = [];
    days.slice(0, 5).forEach((day, index) => {
      dailys.push(
        <div key={index}>
          <DailyNote
            date={day.date}
            udid={day.udid}
            content={this.props.contents[day.udid]}
          />
        </div>
      );
    });

    dailys.push(
      <div key="weekend-key" className="weekend-row">
        <div key={5} className="column-one">
          <DailyNote
            date={days[5].date}
            udid={days[5].udid}
            content={this.props.contents[days[5].udid]}
          />
        </div>
        <div key={6} className="column-two">
          <DailyNote
            date={days[6].date}
            udid={days[6].udid}
            content={this.props.contents[days[6].udid]}
          />
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
  fetchAllDailyNotes: PropTypes.func.isRequired,
  size: PropTypes.object,
  contents: PropTypes.object
};

const mapStateToProps = state => {
  return {
    date: state.date.selectedDate,
    size: state.layout[LayoutIds.DailyNotesCollection],
    contents: state.notes.contents
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchAllDailyNotes: bindActionCreators(fetchAllDailyNotes, dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DailyNotesCollection);
