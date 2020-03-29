import React, { useEffect } from 'react';
import LayoutConstants from '../../constants/LayoutConstants';
import { bindActionCreators } from 'redux';
import * as layoutActions from '../redux/actions/layoutActions';
import { connect } from 'react-redux';
const _ = require('lodash');

interface ILayoutNode {
  id?: string;
  width: number;
  height: number;
  children?: Array<ILayoutNode>;
}

class BasicLayoutNode implements ILayoutNode {
  public id: string = '';
  public width: number = 0;
  public height: number = 0;
  public children: Array<ILayoutNode> = new Array();
}

class LayoutRoot extends BasicLayoutNode {
  constructor(width, height) {
    super();
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

class WeekNotesPanel extends BasicLayoutNode {
  constructor(width, height) {
    super();
    this.id = LayoutConstants.WeeklyNotesPanel;
    this.width = width;
    this.height = height;
  }
}

class DailyNotesPanel extends BasicLayoutNode {
  constructor(width, height) {
    super();
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

class DailyNotesHeader extends BasicLayoutNode {
  constructor(width, height) {
    super();
    this.id = LayoutConstants.DailyNotesHeader;
    this.width = width;
    this.height = height;
  }
}

class DailyNotesCollection extends BasicLayoutNode {
  constructor(width, height) {
    super();
    this.id = LayoutConstants.DailyNotesCollection;
    this.width = width;
    this.height = height;
    this.children = [new DailyNote(width, height / 6)];
  }
}

class DailyNote extends BasicLayoutNode {
  constructor(width, height) {
    super();
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

interface ILayoutProviderProps {
  updateLayout: Function;
}
let initilized = false;

// TODO: To convert this into a non react component
const LayoutProvider = ({ updateLayout }: ILayoutProviderProps) => {
  useEffect(() => {
    if (!initilized) {
      initilized = true;
      const spinner = document.getElementById(
        'index-loading-spinner'
      ) as HTMLElement;
      spinner.style.display = 'none';
      updateComponetSize();
      window.addEventListener('resize', updateComponetSize);
    }
  });

  const updateComponetSize = () => {
    const rootDiv = document.getElementById('app') as HTMLElement;
    const rootDivWidth = rootDiv.clientWidth;
    const rootDivHeight = rootDiv.clientHeight;
    const layoutTree = new LayoutRoot(rootDivWidth, rootDivHeight);

    const layout = {};

    getLayout(layoutTree, layout);
    updateLayout(layout);
  };

  return <React.Fragment />;
};

const mapStateToProps: any = (state: any) => ({
  // layout: state.layout
});

const mapDispatchToProps: any = (dispatch: any) => {
  return {
    updateLayout: bindActionCreators(layoutActions.updateLayout, dispatch)
  };
};

export const initLayout = () => {
  const rootDiv = document.getElementById('app') as HTMLElement;
  const rootDivWidth = rootDiv.clientWidth;
  const rootDivHeight = rootDiv.clientHeight;
  const layoutTree = new LayoutRoot(rootDivWidth, rootDivHeight);

  const layout = {};

  getLayout(layoutTree, layout);
  return layout;
};

export default connect(mapStateToProps, mapDispatchToProps)(LayoutProvider);
