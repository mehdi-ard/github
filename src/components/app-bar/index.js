import React from 'react';
import { state, Beep } from 'react-beep';

import { withRouter, Link } from 'react-router-dom';

/**
 * core
 */
import CoreAppBar from '@material-ui/core/AppBar';
import CoreToolbar from '@material-ui/core/Toolbar';
import Grid from '@material-ui/core/Grid';
import LongMenu from 'microcomponents/long-menu';
import Typography from 'microcomponents/typography';
import Icon from 'microcomponents/icon';
/**
 * icon
 */
import styles from './styles';

class AppBar extends Beep(['user']) {

  componentDidUpdate(prevProps) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      this.onRouteChanged();
    }
  }

  onRouteChanged() {
    this.setState({
      isShowMenu: false
    });
  }

  render() {
    const { classes } = this.props;
    return (
      state.token && (
        <CoreAppBar position="static" className={classes.bar}>
          <CoreToolbar>
            <Grid container justify='space-between'>

              <div className={classes.iconGit}>
                <Link to={'/'} className={classes.headerLink}>
                  <svg className="octicon octicon-mark-github v-align-middle" height="32" viewBox="0 0 16 16" version="1.1" width="32" aria-hidden="true">
                    <path fillRule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"></path>
                  </svg>
                </Link>
              </div>

              <Grid item>
                <LongMenu
                  iconClass={classes.iconClass}
                  icon={
                    <>
                      {state.user && (
                        <Typography className={classes.mobileProfile}>
                          {state.user.firstName} {state.user.lastName}
                        </Typography>
                      )}
                      <div className={classes.iconAvatar}>
                        <div className={classes.userHeaderAvatar}>
                          <img src={state.user.avatar_url} alt={state.user.login} />
                        </div>
                        {' '}<Icon>keyboard_arrow_down </Icon>
                      </div>
                    </>
                  }
                  options={[
                    { key: '/', value: `Signed in as ${state.user.login}` },
                    { key: '/', value: 'Your profile' },
                    { key: '/repositories', value: 'Your repositories' },
                    { key: '/stars', value: 'Your stars' },
                    { key: '/gists', value: 'Your gists' },
                    { key: '/', value: 'Help' },
                    { key: '/', value: 'Settings' },
                    { key: '/logout', value: 'Sign out' }
                  ]}
                  onChange={key => {
                    if (key === '/logout') {
                      state.backUrl = '';
                    }
                    this.props.history.push(key);
                  }}
                />
              </Grid>
            </Grid>
          </CoreToolbar>
        </CoreAppBar>
      )
    );
  }
}

export default styles(withRouter(AppBar));
