import React from 'react';
import moment from 'moment';
import './DailyNotesHeader.less';
import { useSelector } from 'react-redux';
import LayoutIds from '../../../../constants/LayoutConstants';
import DateNavigation from '../dateNavigation/DateNavigation';
import { useTranslation } from 'react-i18next';
import { monthMap } from '../../../constants';

interface IDailyNotesHeaderProps {
  date: Date;
}

const DailyNotesHeader = ({ date }: IDailyNotesHeaderProps) => {
  const size = useSelector(
    (state: any) => state.layout[LayoutIds.DailyNotesHeader]
  );
  const { t } = useTranslation();
  const nth = moment(date).week().toString();
  return (
    <div
      className="daily-note-header-container"
      style={{ height: size.height + 'px' }}
    >
      <div className="daily-note-header-left">
        <span className="month-title">{t(monthMap[date.getMonth()])}</span>
        <span className="week-number">({t('NUM_OF_WEEK', { nth })})</span>
      </div>
      <div className="daily-note-header-center">
        <DateNavigation />
      </div>
      <div className="daily-note-header-right">{date.getFullYear()}</div>
    </div>
  );
};

export default DailyNotesHeader;
