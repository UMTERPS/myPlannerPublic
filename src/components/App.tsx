import React from 'react';
import './App.less';
import Planner from './planner/Planner';
import Settings from './settings/Settings';
import Tabs from 'antd/es/tabs';
import LayoutConstants from '../../constants/LayoutConstants.js';
import { connect } from 'react-redux';
import { SettingFilled, ScheduleFilled } from '@ant-design/icons';

const App = ({ size }) => {
  const { TabPane } = Tabs;
  return (
    <div className="App-Container">
      <Tabs
        defaultActiveKey="planner"
        tabPosition="left"
        style={{ height: size.height }}
        tabBarStyle={{ width: LayoutConstants.SideNavWidth }}
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

const mapStateToProps = state => {
  return {
    size: state.layout[LayoutConstants.LayoutRoot]
  };
};

export default connect(mapStateToProps)(App);
