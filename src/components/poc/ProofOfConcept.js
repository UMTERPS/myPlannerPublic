import React from 'react';
import 'react-calendar/dist/Calendar.css';
import DailyNoteCollection from '../dailyNotes/dailyNoteCollection';
import WeekNote from '../weekNote/WeekNote';
import './ProofOfConcept.less';

class ProofOfConceptPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dailyNoteCollectionSize: {
        width: -1,
        height: -1
      },
      weekNoteSize: {
        width: -1,
        height: -1
      }
    };
    this.updateComponetSize = this.updateComponetSize.bind(this);
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
    this.setState({
      dailyNoteCollectionSize: {
        width: rootDivWidth * 0.6,
        height: rootDivHeight
      },
      weekNoteSize: {
        width: rootDivWidth * 0.4,
        height: rootDivHeight
      }
    });
  }

  render() {
    return (
      <React.Fragment>
        <div className="my-planner-container" id="my-plainer-container-id">
          <DailyNoteCollection size={this.state.dailyNoteCollectionSize} />
          <WeekNote size={this.state.weekNoteSize} />
        </div>
      </React.Fragment>
    );
  }
}

export default ProofOfConceptPage;
