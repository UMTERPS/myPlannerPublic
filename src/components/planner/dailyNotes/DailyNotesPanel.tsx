import React from 'react';
import DailyNotesHeader from './DailyNotesHeader';
import DailyNotesCollection from './DailyNotesCollection';
import LayoutIds from '../../../../constants/LayoutConstants';
import './DailyNotesPanel.less';
import { useSelector } from 'react-redux';
import { getMondayOfWeek } from '../../../services/DateUtilService';

const DailyNotesPanel = () => {
  const date = useSelector((state: any) => state.date.selectedDate);
  const size = useSelector((state: any) => state.layout[LayoutIds.DailyNotesPanel]);
  return (
    <div className="daily-panel" style={{ width: size.width + 'px' }}>
      <DailyNotesHeader date={getMondayOfWeek(date)} />
      <DailyNotesCollection/>
    </div>
  );
};

export default DailyNotesPanel;
