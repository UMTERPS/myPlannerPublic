import React, { useState, useContext } from 'react';
import Calendar from 'react-calendar';
import moment from 'moment';
import './CalendarPopup.less';
import { useTranslation } from 'react-i18next';
import { AppContext } from '../../context/AppContext';

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

  return (
    <div className="calendar-popup" id="calendar-popup-id">
      <div className="popup-button-container">
        <button
          id="popup-button"
          onClick={toggleCalendar}
          className="btn btn-sm btn-light"
        >
          {t('CALENDAR')}
        </button>
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
