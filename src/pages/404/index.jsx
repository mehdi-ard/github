import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import imgDeactive from 'assets/images/not_found.svg';
import Button from 'microcomponents/button';
import Typography from 'microcomponents/typography'

const styles = theme => ({
  deactiveContainer: {
    height: 'calc(100vh - 112px)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    '& p': {
      margin: 0
    }
  },

  deactiveContainerImg: {
    marginBottom: 31
  },
  deactiveContainerBtn: {
    marginTop: 16
  }
});

class NoteFoundPage extends Component {
  handleRedirect = () => {
    this.props.history.push('/');
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.deactiveContainer}>
        <img
          src={imgDeactive}
          className={classes.deactiveContainerImg}
          alt="deactive"
        />
        <Typography>This is not the web page you are looking for.</Typography>
        <Button
          data-id="button-goto-dashboard"
          size="large"
          color="default"
          variant="contained"
          className={classes.deactiveContainerBtn}
          onClick={this.handleRedirect}
        >
          back to home
        </Button>
      </div>
    );
  }
}

export default withStyles(styles)(withRouter(NoteFoundPage));
