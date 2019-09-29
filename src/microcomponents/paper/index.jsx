import React from 'react';
import CorePaper from '@material-ui/core/Paper';
import style from '../../providers/style';

const styles = style(theme => ({
  root: {
    ...theme.mixins.gutters(),
    padding: '0 !important',
    width: '100%'
  }
}));

/**
 * @description Paper
 * @see https://material-ui.com/api/paper/
 */

function Paper({ classes, className, children, ...props }) {
  return (
    <CorePaper className={[classes.root, className].join(' ')} {...props}>
      {children}
    </CorePaper>
  );
}

export default styles(Paper);
