import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Dialog from 'microcomponents/dialog';
import Button from 'microcomponents/button';
import Input from 'microcomponents/input';
import { Grid } from '@material-ui/core';

const styles = theme => ({
  fullWidth: {
    width: '100%',
    margin: 0
  },
  gistesContent: {
    height: 500
  }
});

class ModalGists extends React.Component {
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
      commentValue,
      onKeyDown,
      filesHeader,
      onchangeFilesHeader
    } = this.props;
    return (
      <>
        <Dialog
          open={openDialog}
          onClose={onClose}
          title={title}
          maxWidth={'md'}
        >
          <Grid container spacing={2} className={classes.fullWidth}>
            <Grid item xs={12}>
              <Input
                label="Title"
                type="text"
                margin="normal"
                variant="outlined"
                fullWidth
                value={filesHeader}
                onChange={onchangeFilesHeader}
              />

            </Grid>
            <Grid item xs={12}>
              <Input
                label="Filename including extension"
                type="text"
                margin="normal"
                variant="outlined"
                fullWidth
                value={titleValue}
                onChange={onchangeTitle}
              />
              <Input
                label="Leave a comment"
                type="text"
                margin="normal"
                variant="outlined"
                fullWidth
                multiline
                rowsMax="14"
                rows='14'
                value={commentValue}
                onChange={onchangeComment}
                onKeyDown={onKeyDown}
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

export default withStyles(styles)(ModalGists);
