import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Dialog from 'microcomponents/dialog';
import Button from 'microcomponents/button';
import Input from 'microcomponents/input';
import { Grid } from '@material-ui/core';

const styles = theme => ({
  buttonInput: {
    paddingTop: theme.spacing(2),
    display: 'flex',
    justifyContent: 'flex-end'
  },
  sendBtn: {
    backgroundColor: theme.palette.error.main,
    color: '#fff'
  },
  sendBtnExtended: {
    backgroundColor: theme.palette.primary.main,
    color: '#fff'
  },
  rejectButton: {
    display: 'flex',
    alignItems: 'center'
  },
  contentDialog: {
    padding: '32px !important'
  },
  fullWidth: {
    width: '100%',
    margin: 0
  }
});

class Modal extends React.Component {
  render() {
    const {
      classes,
      openDialog,
      onClose,
      title,
      buttonAgree,
      onchangeComment,
      onchangeTitle,
      titleValue,
      commentValue
    } = this.props;
    return (
      <>
        <Dialog
          open={openDialog}
          onClose={onClose}
          title={title}
        >
          <Grid container spacing={2} className={classes.fullWidth}>
            <Grid item xs={12}>
              <Input
                label="Title"
                type="text"
                margin="normal"
                variant="outlined"
                fullWidth
                value={titleValue}
                onChange={onchangeTitle}
              />

            </Grid>
            <Grid item xs={12}>
              <Input
                label="Leave a comment"
                type="text"
                margin="normal"
                variant="outlined"
                fullWidth
                multiline
                rowsMax="4"
                value={commentValue}
                onChange={onchangeComment}
              />
            </Grid>
          </Grid>
          <div className={classes.buttonInput}>

            <Button
              size="medium"
              color={'primary'}
              variant="contained"
              onClick={buttonAgree}
            >
              Submit new issue
            </Button>
          </div>
        </Dialog>
      </>
    );
  }
}

export default withStyles(styles)(Modal);
