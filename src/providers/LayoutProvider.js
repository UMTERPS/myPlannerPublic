import React from 'react';
import LayoutConstants from '../../constants/LayoutConstants';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import * as layoutActions from '../redux/actions/layoutActions';
import { connect } from 'react-redux';
const _ = require('lodash');

class LayoutRoot {
  constructor(width, height) {
    this.width = width;
    this.height = Math.max(height, LayoutConstants.AppMinHeight);
    const dailyNoteWidth = Math.max(width, LayoutConstants.AppMinWidth) * 0.6;
    const weekNoteWidth = Math.max(width, LayoutConstants.AppMinWidth) * 0.4;
    this.children = [
      new WeekNotesPanel(weekNoteWidth, height),
      new DailyNotesPanel(dailyNoteWidth, height)
    ];
  }
}

class WeekNotesPanel {
  constructor(width, height) {
    this.id = LayoutConstants.WeeklyNotesPanel;
    this.width = width;
    this.height = height;
  }
}

class DailyNotesPanel {
  constructor(width, height) {
    this.id = LayoutConstants.DailyNotesPanel;
    this.width = width;
    this.height = height;
    this.children = [
      new DailyNotesHeader(width, LayoutConstants.DailyNotesHeaderHeight),
      new DailyNotesCollection(
        width,
        height - LayoutConstants.DailyNotesHeaderHeight
      )
    ];
  }
}

class DailyNotesHeader {
  constructor(width, height) {
    this.id = LayoutConstants.DailyNotesHeader;
    this.width = width;
    this.height = height;
  }
}

class DailyNotesCollection {
  constructor(width, height) {
    this.id = LayoutConstants.DailyNotesCollection;
    this.width = width;
    this.height = height;
    this.children = [new DailyNote(width, height / 6)];
  }
}

class DailyNote {
  constructor(width, height) {
    this.id = LayoutConstants.DailyNote;
    this.width = width;
    this.height = height;
  }
}

const getLayout = (root, layout) => {
  if (root.children) {
    _.each(root.children, child => {
      getLayout(child, layout);
    });
  }

  if (root.id) {
    _.extend(layout, {
      [root.id]: {
        width: root.width,
        height: root.height
      }
    });
  }
};

// TODO: To convert this into a non react component
class LayoutProvider extends React.Component {
  constructor(props) {
    super(props);
    this.updateComponetSize = this.updateComponetSize.bind(this);
    this.updateComponetSize();
  }

  componentDidMount() {
    const spinner = document.getElementById('index-loading-spinner');
    spinner.style.display = 'none';

    this.updateComponetSize();
    window.addEventListener('resize', this.updateComponetSize);
  }

  updateComponetSize() {
    const rootDiv = document.getElementById('app');
    const rootDivWidth = rootDiv.clientWidth;
    const rootDivHeight = rootDiv.clientHeight;
    const layoutTree = new LayoutRoot(rootDivWidth, rootDivHeight);

    const layout = {};

    getLayout(layoutTree, layout);
    this.props.updateLayout(layout);
  }

  render() {
    return <React.Fragment />;
  }
}

LayoutProvider.propTypes = {
  updateLayout: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  layout: state.layout
});

const mapDispatchToProps = dispatch => {
  return {
    updateLayout: bindActionCreators(layoutActions.updateLayout, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LayoutProvider);
