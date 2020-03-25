import React from 'react';
import DailyNotesHeader from './DailyNotesHeader';
import DailyNotesCollection from './DailyNotesCollection';
import LayoutIds from '../../../constants/LayoutConstants';
import './DailyNotesPanel.less';
import { connect } from 'react-redux';
import { Size } from '../../types/commonTypes';
import { getMondayOfWeek } from '../../services/DateUtilService';

interface DailyNotesPanelProps {
  date: Date;
  size: Size;
}

const DailyNotesPanel = ({ date, size }: DailyNotesPanelProps) => {
  return (
    <div className="daily-panel" style={{ width: size.width + 'px' }}>
      <DailyNotesHeader date={getMondayOfWeek(date)} />
      <DailyNotesCollection date={date} />
    </div>
  );
};

const mapStateToProps: any = (state: any) => {
  return {
    date: state.date.selectedDate,
    size: state.layout[LayoutIds.DailyNotesPanel]
  };
};

export default connect(mapStateToProps)(DailyNotesPanel);
