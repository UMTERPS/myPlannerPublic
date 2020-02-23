import React from 'react';
import * as dateActions from '../../redux/actions/dateActions';
import { bindActionCreators } from 'redux';
import CalendarPopup from '../calendar/CalendarPopup';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './DateNavigation.less';

class DateNavigation extends React.Component {
  constructor(props) {
    super(props);
    this.goPrevWeek = this.goPrevWeek.bind(this);
    this.goNextWeek = this.goNextWeek.bind(this);
  }

  goPrevWeek() {
    const _date = new Date(this.props.selectedDate);
    _date.setDate(this.props.selectedDate.getDate() - 7);
    this.props.setDate(_date);
  }

  goNextWeek() {
    const _date = new Date(this.props.selectedDate);
    _date.setDate(this.props.selectedDate.getDate() + 7);
    this.props.setDate(_date);
  }

  render() {
    return (
      <div className="date-navi-header">
        <div className="date-navi-left">
          <button
            id="prev-week"
            onClick={this.goPrevWeek}
            className="btn btn-sm"
          >
            &lt;&lt;
          </button>
        </div>
        <CalendarPopup
          date={this.props.selectedDate}
          setDate={this.props.setDate}
        />
        <div className="date-navi-right">
          <button
            id="next-week"
            onClick={this.goNextWeek}
            className="btn btn-sm"
          >
            &gt;&gt;
          </button>
        </div>
      </div>
    );
  }
}

DateNavigation.propTypes = {
  selectedDate: PropTypes.object.isRequired,
  setDate: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    selectedDate: state.date.selectedDate
  };
};

const mapDisptchToProps = dispatch => {
  return {
    setDate: bindActionCreators(dateActions.updateSelectedDate, dispatch)
  };
};

export default connect(mapStateToProps, mapDisptchToProps)(DateNavigation);
