import React from 'react';
import Button from 'microcomponents/button';
import { withStyles } from '@material-ui/core/styles';
import Typography from 'microcomponents/typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { state } from 'react-beep';


const styles = theme => ({
  userImage: {
    width: '100%',
    borderRadius: 3,
    border: '1px solid #e1e4e8',
    overflowl: 'hidden',
    cursor: 'pointer',
    '& img': {
      width: '100%',
      objectFit: 'cover',
    }
  },
  userStatus: {
    display: 'flex',
    alignItems: 'center',
    padding: `${theme.spacing(1)}px ${theme.spacing(2)}px`
  },
  iconStatus: {
    marginRight: theme.spacing(1),
    display: 'flex',
    alignItems: 'center',
  },
  userName: {
    marginTop: theme.spacing(2)
  },
  rootList: {
    paddingBottom: theme.spacing(2),
    marginBottom: theme.spacing(2),
    borderBottom: '1px solid #e1e4e8'
  },
  iconAbout: {
    width: 25,
    height: 20,
    fontSize: '1.1em',
    display: 'flex',
    justifyContent: 'center',
    // alignItems: 'center',
  },
  listUser: {
    display: 'flex',
    alignItems: 'center',
    padding: 0,
    marginBottom: theme.spacing(1)
  },
  titleUser: {
    margin: 0,
    '& span': {
      fontSize: '.8em'
    }
  },

})


class Slide extends React.Component {

  render() {
    const { classes } = this.props;

    return (
      <>
        <div className={classes.userImage}>
          <img src={state.user.avatar_url} alt="" />
          <div className={classes.userStatus}>
            <div className={classes.iconStatus}>
              <svg className="octicon octicon-smiley" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fillRule="evenodd" d="M8 0C3.58 0 0 3.58 0 8s3.58 8 8 8 8-3.58 8-8-3.58-8-8-8zm4.81 12.81a6.72 6.72 0 0 1-2.17 1.45c-.83.36-1.72.53-2.64.53-.92 0-1.81-.17-2.64-.53-.81-.34-1.55-.83-2.17-1.45a6.773 6.773 0 0 1-1.45-2.17A6.59 6.59 0 0 1 1.21 8c0-.92.17-1.81.53-2.64.34-.81.83-1.55 1.45-2.17.62-.62 1.36-1.11 2.17-1.45A6.59 6.59 0 0 1 8 1.21c.92 0 1.81.17 2.64.53.81.34 1.55.83 2.17 1.45.62.62 1.11 1.36 1.45 2.17.36.83.53 1.72.53 2.64 0 .92-.17 1.81-.53 2.64-.34.81-.83 1.55-1.45 2.17zM4 6.8v-.59c0-.66.53-1.19 1.2-1.19h.59c.66 0 1.19.53 1.19 1.19v.59c0 .67-.53 1.2-1.19 1.2H5.2C4.53 8 4 7.47 4 6.8zm5 0v-.59c0-.66.53-1.19 1.2-1.19h.59c.66 0 1.19.53 1.19 1.19v.59c0 .67-.53 1.2-1.19 1.2h-.59C9.53 8 9 7.47 9 6.8zm4 3.2c-.72 1.88-2.91 3-5 3s-4.28-1.13-5-3c-.14-.39.23-1 .66-1h8.59c.41 0 .89.61.75 1z"></path></svg>
            </div>
            <div>
              <Typography>Set status</Typography>
            </div>
          </div>
        </div>
        <div className={classes.userName}>
          <Typography variant="h3">{state.user.name}</Typography>
          <Typography variant="body1">{state.user.login}</Typography>
        </div>
        <Button variant="outlined" color="secondary" fullWidth>Edit profile</Button>
        <div>
          <List className={classes.rootList}>
            <ListItem className={classes.listUser}>
              <span className={classes.iconAbout}>👥</span>
              <ListItemText className={classes.titleUser} primary={state.user.company} />
            </ListItem>
            <ListItem className={classes.listUser}>
              <span className={classes.iconAbout}>📍</span>
              <ListItemText className={classes.titleUser} primary={state.user.location} />
            </ListItem>
            <ListItem className={classes.listUser}>
              <span className={classes.iconAbout}>✉</span>
              <a href={`mailto:${state.user.email}`}>
                <ListItemText className={classes.titleUser} primary={state.user.email} />
              </a>
            </ListItem>
            <ListItem className={classes.listUser}>
              <span className={classes.iconAbout}>🔗</span>
              <a href={`http://${state.user.blog}`}>
                <ListItemText className={classes.titleUser} primary={state.user.blog} />
              </a>
            </ListItem>
          </List>
        </div>
        <div>
          <Typography className={classes.title} variant="h6">Organizations</Typography>
        </div>

      </>
    )
  }
}

export default withStyles(styles)(Slide);
