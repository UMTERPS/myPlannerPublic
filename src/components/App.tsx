import React from 'react';
import './App.less';
import Planner from './planner/Planner';
import Settings from './settings/Settings';
import Tabs from 'antd/es/tabs';
import LayoutConstants from '../../constants/LayoutConstants.js';
import { connect } from 'react-redux';
import { BsPencil, BsFillGearFill } from 'react-icons/bs';

const App = ({ size }) => {
  const { TabPane } = Tabs;
  return (
    <div className="App-Container">
      <Tabs
        defaultActiveKey="planner"
        tabPosition="left"
        style={{ height: size.height }}
        tabBarStyle={{}}
      >
        <TabPane tab={<BsPencil size={20} />} key="planner">
          <Planner />
        </TabPane>
        <TabPane tab={<BsFillGearFill />} key="settings">
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
