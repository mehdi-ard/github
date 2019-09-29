import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import services from 'services';
import history from 'utils/history'
import Paper from 'microcomponents/paper';
import Grid from '@material-ui/core/Grid';
import Input from 'microcomponents/input';
import Button from 'microcomponents/button';
import Typography from 'microcomponents/typography';
import { state } from 'react-beep'

const styles = theme => ({
  iconGit: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%'
  },
  loginBtn: {
    margin: 0
  },
  loginPaper: {
    padding: `${theme.spacing(1.5)}px !important`,
    marginTop: theme.spacing(2)
  },
  loginInput: {
    marginTop: 0
  }
});

class Login extends React.Component {
  state = {
    username: '',
    password: ''
  }

  handlerChangeInput = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };


  handleLogin = async () => {
    const { username, password } = this.state;
    state.base = { username, password }
    const sendUser = await services.users.login();
    const response = await sendUser.json()
    if (sendUser.ok) {
      state.user = response
      state.token = response.node_id
      this.props.history.push('/')
    }
  }


  render() {
    const { classes } = this.props;
    const { username, password } = this.state
    return (
      <section className={classes.loginSection}>
        <div className={classes.iconGit}>
          <a href='https://github.com'>
            <svg height="48" className="octicon octicon-mark-github" viewBox="0 0 16 16" version="1.1" width="48" aria-hidden="true">
              <path fillRule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z">
              </path>
            </svg>
          </a>
          <Typography variant="h5">Sign in to GitHub</Typography>
        </div>
        <Grid container justify='center'>
          <Grid item xs={3}>
            <Paper className={classes.loginPaper}>
              <Input
                label="username"
                type="text"
                margin="normal"
                variant="outlined"
                fullWidth
                value={username}
                autoFocus={true}
                onChange={this.handlerChangeInput('username')}
                className={classes.loginInput}
              />
              <Input
                label="password"
                type="password"
                margin="normal"
                variant="outlined"
                fullWidth
                value={password}
                onChange={this.handlerChangeInput('password')}
                className={classes.loginInput}
              />
              <Button
                color='primary'
                variant="contained"
                className={classes.loginBtn}
                fullWidth
                onClick={this.handleLogin}
              >
                Login
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </section>
    );
  }
}

export default withStyles(styles)(withRouter(Login));
