import * as React from 'react';
import './SideNav.less';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import LayoutConstants from '../../../constants/LayoutConstants';
import { ISize } from '../../types/commonTypes';
import { BsFillGearFill, BsPencil } from 'react-icons/bs';

interface ISideNavProps {
  size: ISize;
}

const SideNav = ({ size }: ISideNavProps) => {
  const activeStyle = { backgroundColor: '#aaaaaa', color: '#111111' };
  return (
    <div
      className="Side-Navigation"
      style={{ minHeight: size.height + 'px', minWidth: size.width + 'px' }}
    >
      <NavLink
        className="Nav-Link"
        to="/planner"
        activeStyle={activeStyle}
        exact
      >
        <div className="Nav-Item">
          <BsPencil />
        </div>
      </NavLink>

      <NavLink
        className="Nav-Link"
        to="/settings"
        activeStyle={activeStyle}
        exact
      >
        <div className="Nav-Item">
          <BsFillGearFill />
        </div>
      </NavLink>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    size: state.layout[LayoutConstants.SideNav]
  };
};

// const mapDispatchToProps = dispatch => {
//   return {
//     fetchWeeklyNote: bindActionCreators(fetchWeeklyNote, dispatch),
//     saveNote: bindActionCreators(saveWeeklyNote, dispatch)
//   };
// };

export default connect(mapStateToProps)(SideNav);
