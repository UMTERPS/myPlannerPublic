import React, { useState, useContext } from 'react';
import moment, { Moment } from 'moment';
import './CalendarPopup.less';
import { useTranslation } from 'react-i18next';
import { AppContext } from '../../../context/AppContext';
import Button from 'antd/es/button';
import Calendar from 'antd/es/calendar';
import Modal from 'antd/es/modal';
import Row from 'antd/es/row';
import Col from 'antd/es/col';
import ConfigProvider from 'antd/es/config-provider';
import en_GB from 'antd/es/locale/en_GB';
import zh_CN from 'antd/es/locale/zh_CN';
import {
  LeftOutlined,
  RightOutlined,
  DoubleLeftOutlined,
  DoubleRightOutlined
} from '@ant-design/icons';

interface ICalendarPopupProps {
  date: Date;
  setDate: Function;
}

const CalendarPopup = ({ date, setDate }: ICalendarPopupProps) => {
  const [showCalendar, setShowCalendar] = useState(false);
  const [calendarDispalyDate, setCalendarDispalyDate] = useState(date);
  const { t } = useTranslation();
  const { locale } = useContext(AppContext);
  const calendarLocale = locale === 'en-US' ? en_GB : zh_CN;
  moment.locale(locale);

  const goBackToToday = () => {
    updateDate(moment());
  };

  const updateDate = (date: Moment): void => {
    setCalendarDispalyDate(date.toDate());
    setDate(date.toDate());
  };

  const onDisplayDateChange = (date: Moment) => {
    return () => {
      setCalendarDispalyDate(date.toDate());
    };
  };

  const toggleCalendar = () => {
    setShowCalendar(!showCalendar);
  };

  const isToday = (_date): boolean => {
    return moment(_date).isSame(new Date(), 'date');
  };

  const calendarHeaderRenderer = ({ value, type, onChange, onTypeChange }) => {
    return (
      <Row>
        <Col span={2}>
          <Button
            ghost
            type="primary"
            onClick={onDisplayDateChange(
              moment(calendarDispalyDate).add(-1, 'year')
            )}
            className="calendar-nav-button"
          >
            <DoubleLeftOutlined />
          </Button>
        </Col>
        <Col span={2}>
          <Button
            ghost
            type="primary"
            onClick={onDisplayDateChange(
              moment(calendarDispalyDate).add(-1, 'month')
            )}
            className="calendar-nav-button"
          >
            <LeftOutlined />
          </Button>
        </Col>
        <Col span={16}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignContent: 'center'
            }}
          >
            <div>{moment(calendarDispalyDate).format(t('DATE_FORMATTER'))}</div>
          </div>
        </Col>
        <Col span={2}>
          <Button
            ghost
            type="primary"
            onClick={onDisplayDateChange(
              moment(calendarDispalyDate).add(1, 'month')
            )}
            className="calendar-nav-button"
          >
            <RightOutlined />
          </Button>
        </Col>
        <Col span={2}>
          <Button
            ghost
            type="primary"
            onClick={onDisplayDateChange(
              moment(calendarDispalyDate).add(1, 'year')
            )}
            className="calendar-nav-button"
          >
            <DoubleRightOutlined />
          </Button>
        </Col>
      </Row>
    );
  };

  const footerRenderer = !isToday(date) ? (
    <React.Fragment>
      <Row>
        <Col span={24}>
          <Button
            ghost
            type="primary"
            onClick={goBackToToday}
            className="calendar-nav-button"
          >
            {t('BACK_TO_TODAY')}
          </Button>
        </Col>
      </Row>
    </React.Fragment>
  ) : null;

  return (
    <div className="calendar-popup" id="calendar-popup-id">
      <div className="popup-button-container">
        <Button ghost onClick={toggleCalendar} type="primary">
          <span id="popup-button">{t('CALENDAR')}</span>
        </Button>
      </div>
      <Modal
        title={null}
        visible={showCalendar}
        closable={false}
        onCancel={toggleCalendar}
        footer={footerRenderer}
      >
        {/* FixMe: Antd calendar's display range is bound to the selected date. 
          Need to see if they can be unbound. */}
        <ConfigProvider locale={calendarLocale}>
          <Calendar
            fullscreen={false}
            value={moment(calendarDispalyDate)}
            headerRender={calendarHeaderRenderer}
            onChange={updateDate}
          />
        </ConfigProvider>
      </Modal>
    </div>
  );
};

export default CalendarPopup;
