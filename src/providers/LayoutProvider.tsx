import React, { useEffect } from 'react';
import LayoutConstants from '../../constants/LayoutConstants';
import * as layoutActions from '../redux/actions/layoutActions';
import { useDispatch } from 'react-redux';

interface ILayoutNode {
  id?: string;
  width: number;
  height: number;
  children: Array<ILayoutNode>;
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
    this.id = LayoutConstants.LayoutRoot;
    this.width = width;
    this.height = Math.max(height, LayoutConstants.AppMinHeight);
    const panelWidth = width - LayoutConstants.SideNavWidth;
    const dailyNoteWidth =
      Math.max(panelWidth, LayoutConstants.AppMinWidth) * 0.6;
    const weekNoteWidth = panelWidth - dailyNoteWidth;
    this.children = [
      new WeekNotesPanel(weekNoteWidth, height),
      new DailyNotesPanel(dailyNoteWidth, height),
      new Settings(panelWidth, height)
    ];
  }
}

class Settings extends BasicLayoutNode {
  constructor(width, height) {
    super();
    this.id = LayoutConstants.Settings;
    this.width = width;
    this.height = height;
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

const getLayout = (root: ILayoutNode, layout: Object) => {
  if (root.children) {
    root.children.forEach(child => {
      getLayout(child, layout);
    });
  }

  if (root.id) {
    layout[root.id] = {
      width: root.width,
      height: root.height
    };
  }
};

let initilized = false;

// TODO: To convert this into a non react component
const LayoutProvider = () => {
  const dispatch = useDispatch();
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
    dispatch(layoutActions.updateLayout(layout));
  };

  return <React.Fragment />;
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

export default LayoutProvider;
