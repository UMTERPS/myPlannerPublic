import React from 'react';
import './App.less';
import Planner from './planner/Planner';
import Settings from './settings/Settings';
import Tabs from 'antd/es/tabs';
import LayoutConstants from '../../constants/LayoutConstants.js';
import { useSelector } from 'react-redux';
import { SettingFilled, ScheduleFilled } from '@ant-design/icons';

const App = () => {
  const size = useSelector((state: any) => state.layout[LayoutConstants.LayoutRoot]);
  const { TabPane } = Tabs;
  return (
    <div className="App-Container">
      <Tabs
        defaultActiveKey="planner"
        tabPosition="left"
        style={{ height: size.height }}
      >
        <TabPane tab={<ScheduleFilled />} key="planner">
          <Planner />
        </TabPane>
        <TabPane tab={<SettingFilled />} key="settings">
          <Settings />
        </TabPane>
      </Tabs>
    </div>
  );
};

export default App;
