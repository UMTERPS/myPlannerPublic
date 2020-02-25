import React from 'react';
import { Route, Switch } from 'react-router-dom';

import HomePage from './home/HomePage';
import AboutPage from './about/AboutPage';
import Header from './common/Header';
import PageNotFound from './PageNotFound';
import CoursesPage from './courses/CoursesPage';
import ManageCoursePage from './courses/ManageCoursePage';
import ProofOfConceptPage from './poc/ProofOfConcept';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class App extends React.Component {
  componentDidMount() {
    const spinner = document.getElementById('index-loading-spinner');
    spinner.style.display = 'none';
  }

  render() {
    return (
      <div className="container-fluid">
        <Header />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/about" component={AboutPage} />
          <Route path="/courses" component={CoursesPage} />
          <Route path="/course/:slug" component={ManageCoursePage} />
          <Route path="/course" component={ManageCoursePage} />
          <Route path="/poc" component={ProofOfConceptPage} />
          <Route component={PageNotFound} />
        </Switch>
        <ToastContainer autoClose={3000} hideProgressBar />
      </div>
    );
  }
}

export default App;
