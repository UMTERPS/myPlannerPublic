import React, { useState, useContext } from 'react';
import Calendar from 'react-calendar';
import moment from 'moment';
import './CalendarPopup.less';
import { useTranslation } from 'react-i18next';
import { AppContext } from '../../../context/AppContext';
import Button from 'antd/es/Button';

interface ICalendarPopupProps {
  date: Date;
  setDate: Function;
}

const CalendarPopup = ({ date, setDate }: ICalendarPopupProps) => {
  const [showCalendar, setShowCalendar] = useState(false);
  const { t } = useTranslation();
  const { locale } = useContext(AppContext);

  const goBackToToday = () => {
    setDate(new Date());
  };

  const handleCalendarChange = (date: Date | Date[]) => {
    setDate(date);
  };

  const toggleCalendar = event => {
    if (
      event.target.id === 'popup-button' ||
      event.target.id === 'calendar-popup-container-id'
    ) {
      setShowCalendar(!showCalendar);
    }
  };

  const isToday = (_date): boolean => {
    return moment(_date).isSame(new Date(), 'date');
  };

  type options = {
    date: Date;
    view: any;
  };

  const tileContentHandler = ({ date, view }: options): JSX.Element => {
    return (
      <React.Fragment>
        {view === 'month' && isToday(date) ? (
          <div style={{ fontSize: '0.5em', marginTop: '-0.5em' }}>
            <abbr>{t('TODAY')}</abbr>
          </div>
        ) : null}
      </React.Fragment>
    );
  };

  return (
    <div className="calendar-popup" id="calendar-popup-id">
      <div className="popup-button-container">
        <Button ghost onClick={toggleCalendar} type="primary">
          <span id="popup-button">{t('CALENDAR')}</span>
        </Button>
      </div>
      {showCalendar ? (
        <div
          className="calendar-modal-background"
          id="calendar-popup-container-id"
          onClick={toggleCalendar}
        >
          <div className="calendar-container">
            <Calendar
              locale={locale}
              onChange={handleCalendarChange}
              calendarType="US"
              value={date}
              view="month"
              tileContent={tileContentHandler}
            />
            <div className="go-today-container">
              {!moment().isSame(date, 'day') ? (
                <button
                  className="btn btn-sm btn-outline-dark go-today-button"
                  onClick={goBackToToday}
                >
                  {t('BACK_TO_TODAY')}
                </button>
              ) : null}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default CalendarPopup;
