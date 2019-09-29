import React from 'react';
import CoreDialog from '@material-ui/core/Dialog';
import CoreDialogContent from '@material-ui/core/DialogContent';
import CoreDialogTitle from '@material-ui/core/DialogTitle';
import CoreSlide from '@material-ui/core/Slide';
import Icon from '../icon';
import IconButton from '../icon-button';
import style from '../../providers/style';

function Transition(props) {
  return <CoreSlide direction="up" {...props} />;
}

/**
 * @description Dialo
 * @see https://material-ui.com/api/dialog/
 */

const styles = style(theme => ({
  dilogHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: `1px solid ${theme.palette.grey[100]}`,
  },
  closeIcon: {
    fontSize: '20px !important'
  },
  boxIcon: {
    marginRight: '15px'
  },
  content: {
    padding: 0
  }
}));

function Dialog({ classes, ...props }) {
  return (
    <CoreDialog
      open={props.open}
      TransitionComponent={Transition}
      keepMounted
      onClose={props.onClose}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
      fullWidth
      {...props}
    >
      <div className={classes.dilogHeader}>
        <CoreDialogTitle id="alert-dialog-slide-title">
          {props.title}
        </CoreDialogTitle>
        <IconButton
          size="small"
          aria-label="Close"
          color="default"
          onClick={props.onClose}
          className={classes.boxIcon}
        >
          <Icon className={classes.closeIcon}>close</Icon>
        </IconButton>
      </div>
      <CoreDialogContent className={classes.content}>{props.children}</CoreDialogContent>
    </CoreDialog>
  );
}

export default styles(Dialog);
