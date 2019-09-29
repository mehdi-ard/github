import React from 'react';
import { storiesOf } from '@storybook/react';
import Paper from './';

import style from '../../providers/style';

const styles = style(theme => ({
  test: {
    backgroundColor: 'red'
  }
}));

class T extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <Paper elevation={1} className={classes.test}>
        dcdc
      </Paper>
    );
  }
}

const T2 = styles(T);

storiesOf('Paper', module)
  .add('elevation', () => <Paper elevation={1}>dcdc</Paper>)
  .add('with className', () => <T2 />);
