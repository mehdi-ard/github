import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Routes from './configs/routes';
import Router from './providers/router';
import AppBar from './components/app-bar';
import CssBaseline from '@material-ui/core/CssBaseline';
import styles from './styles';

class App extends Component {
  render() {
    const { classes } = this.props;
    return (
      <BrowserRouter>
        <div className={classes.app}>
          <CssBaseline />
          <AppBar />
          <main className={classes.content}>
            <Router routes={Routes} />
          </main>
        </div>
      </BrowserRouter>
    );
  }
}

export default styles(App);
