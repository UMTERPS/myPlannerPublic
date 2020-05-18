import React from 'react';
import moment from 'moment';
import './DailyNotesHeader.less';
import { connect } from 'react-redux';
import LayoutIds from '../../../../constants/LayoutConstants';
import DateNavigation from '../dateNavigation/DateNavigation';
import { ISize } from '../../../types/commonTypes';
import { useTranslation } from 'react-i18next';

const monthMap = [
  'JANUARY',
  'FEBRUARY',
  'MARCH',
  'APRIL',
  'MAY',
  'JUNE',
  'JULY',
  'AUGUEST',
  'SEPTEMPBER',
  'OCTOBER',
  'NOVERMBER',
  'DECEMBER'
];

interface IDailyNotesHeaderProps {
  date: Date;
  size: ISize;
}

const DailyNotesHeader = ({ date, size }: IDailyNotesHeaderProps) => {
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

const mapStateToProps = state => {
  return {
    size: state.layout[LayoutIds.DailyNotesHeader]
  };
};

export default connect(mapStateToProps)(DailyNotesHeader);
