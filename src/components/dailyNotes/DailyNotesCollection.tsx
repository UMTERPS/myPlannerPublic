import React, { ReactNode } from 'react';
import DailyNote from './DailyNote';
import './DailyNotesCollection.less';
import { connect } from 'react-redux';
import LayoutIds from '../../../constants/LayoutConstants';
import { getDailyData } from '../../services/DateUtilService';
// import { bindActionCreators } from 'redux';
// import { fetchAllDailyNotes } from '../../redux/actions/notesActions';

interface IDailyNotesCollectionProps {
  date: Date;
}

const DailyNotesCollection = ({ date }: IDailyNotesCollectionProps) => {
  const generateDailys = () => {
    const days = getDailyData(date);
    const dailys: ReactNode[] = [];
    days.slice(0, 5).forEach((day, index) => {
      dailys.push(
        <div key={index}>
          <DailyNote date={day.date} uid={index} />
        </div>
      );
    });

    dailys.push(
      <div key="weekend-key" className="weekend-row">
        <div key={5} className="column-one">
          <DailyNote date={days[5].date} uid={5} />
        </div>
        <div key={6} className="column-two">
          <DailyNote date={days[6].date} uid={6} />
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

const mapStateToProps: any = (state: any) => {
  return {
    date: state.date.selectedDate,
    size: state.layout[LayoutIds.DailyNotesCollection]
  };
};

// const mapDispatchToProps: any = dispatch => {
//   return {
//     fetchAllDailyNotes: bindActionCreators(fetchAllDailyNotes, dispatch)
//   };
// };

export default connect(
  mapStateToProps
  // mapDispatchToProps
)(DailyNotesCollection);
