import React, { Component } from 'react';
import { Grid } from '@material-ui/core';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import pages from './components/pages';
import history from './history';

class App extends Component {
  render(){
    return (
      <Router history={history}>
        <Route 
          exact
          path="/"
          component={pages.Dashboard}>
        </Route>
        <Route 
          exact
          path="/data"
          component={pages.Input}>
        </Route>
    </Router>
    )
  }
}

export default App