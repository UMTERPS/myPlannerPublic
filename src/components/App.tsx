import * as React from 'react';
import './App.less';
import Planner from './planner/Planner';
import SideNav from './sideNav/SideNav';
import { Switch, Route } from 'react-router-dom';
import Settings from './settings/Settings';

const App = () => {
  return (
    <div className="App-Container">
      <SideNav />
      <Switch>
        <Route exact path="/settings" component={Settings} />
        <Route exact path="/planner" component={Planner} />
        <Route component={Planner} />
      </Switch>
    </div>
  );
};

export default App;
