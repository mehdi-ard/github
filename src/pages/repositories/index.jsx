import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { withRouter } from 'react-router-dom';
import { state } from 'react-beep';
import Button from 'microcomponents/button';
import Typography from 'microcomponents/typography';
import { Link } from 'react-router-dom';
import services from 'services';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { NavLink } from 'react-router-dom';
import Slide from 'components/slide'

const styles = theme => ({
  container: {
    maxWidth: '1140px',
    margin: '0 auto'
  },
  title: {
    textAlign: 'left'
  },
  active: {
    borderBottomColor: '#e36209 !important'
  },
  navMenuPage: {
    display: 'flex',
    listStyle: 'none',
    borderBottom: '1px solid #d1d5da',
    padding: 0,
    '& li': {
      display: 'flex',
      alignItems: 'center',
    },
    '& li a': {
      borderBottom: '2px solid transparent'
    },
    '& li a:hover': {
      borderBottomColor: '#d1d5da'
    }
  },
  link: {
    display: 'flex',
    padding: `${theme.spacing(2)}px ${theme.spacing(2)}px`
  },

  badgetItem: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#586069',
    backgroundColor: 'rgba(27,31,35,.08)',
    borderRadius: 20,
    width: 20,
    height: 20
  },
  repoItem: {
    borderBottom: '1px solid #d1d5da',
    padding: theme.spacing(2),
  },
  descriptionRepo: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(2),
    fontSize: 12,
    textAlign: 'left'
  },
  titleFork: {
    fontSize: 12,
  },
  listRepo: {
    margin: 0,
    padding: 0
  },
  linkRepo: {
    fontSize: 12,
    color: '#0366d6 !important',
    fontWeight: '600 !important'
  },
  girdBox: {
    width: '100%',
    margin: 0
  },
  rootRepo: {
    display: 'flex',
    '& li': {
      width: 'auto',
      display: 'flex',
      alignItems: 'center',
    },
  },
  pinItem: {
    marginRight: 10,
    fontSize: 15
  }

});

class Repositories extends React.Component {
  state = {
    data: ''
  }

  componentDidMount() {
    this.loadRepo()
  }


  constructor(props) {
    super(props);
    this.rowId = [];
  }


  loadRepo = async () => {
    const user = state.user.login
    const dataRepo = await services.repo.repoList(user);
    const repo = await dataRepo.json()
    const data = repo.sort()
    this.setState({
      data
    })
  }


  handelSatrs = async (i) => {
    const nameRepo = this.rowId[i].id;
    const owner = state.user.login
    const repo = nameRepo
    await services.repo.star({ owner, repo })
    this.loadRepo()
  }

  handelUnSatrs = async (i) => {
    const nameRepo = this.rowId[i].id;
    const owner = state.user.login
    const repo = nameRepo
    await services.repo.unstar({ owner, repo })
    this.loadRepo()
  }

  render() {

    const { classes } = this.props;
    const { data } = this.state

    return (
      <section className={classes.container}>
        <Grid container spacing={2} justify="center">
          <Grid item xs={3}>
            <Slide />
          </Grid>
          <Grid item xs={9}>
            <div>
              <ul
                className={classes.navMenuPage}
              >
                <li className={classes.appBarMenuItem}>
                  <NavLink
                    exact={true}
                    to="/"
                    className={classes.link}
                    activeClassName={classes.active}
                  >
                    Overview
                    </NavLink>
                </li>
                <li className={classes.appBarMenuItem}>
                  <NavLink
                    to="/repositories"
                    activeClassName={classes.active}
                    className={classes.link}
                  >
                    Repositories
                    <span className={classes.badgetItem}>{state.user.public_repos}</span>
                  </NavLink>
                </li>
                <li className={classes.appBarMenuItem}>
                  <NavLink
                    to="/projects"
                    activeClassName={classes.active}
                    className={classes.link}
                  >
                    Projects
                    </NavLink>
                </li>
                <li className={classes.appBarMenuItem}>
                  <NavLink
                    to="/packages"
                    activeClassName={classes.active}
                    className={classes.link}
                  >
                    Packages
                    <span className={classes.badgetItem}>{state.user.followers}</span>
                  </NavLink>
                </li>
                <li className={classes.appBarMenuItem}>
                  <NavLink
                    to="/stars"
                    activeClassName={classes.active}
                    className={classes.link}
                  >
                    Stars
                    </NavLink>
                </li>
                <li className={classes.appBarMenuItem}>
                  <NavLink
                    to="/followers"
                    activeClassName={classes.active}
                    className={classes.link}
                  >
                    Followers
                    <span className={classes.badgetItem}>{state.user.followers}</span>
                  </NavLink>
                </li>
                <li className={classes.appBarMenuItem}>
                  <NavLink
                    to="/following"
                    activeClassName={classes.active}
                    className={classes.link}
                  >
                    Following
                    <span className={classes.badgetItem}>{state.user.following}</span>
                  </NavLink>
                </li>
              </ul>
            </div>
            <Grid container spacing={3}>
              {data.length === 0 ? "" : (
                data.map((item, index) => (
                  <Grid item xs={12} key={index} ref={ref => (this.rowId[item.name] = ref)} id={item.name}>
                    <Grid container>
                      <Grid item xs={11}>
                        <Link to={`/${state.user.login}/${item.name}`} className={classes.linkRepo}>
                          <Typography>{item.name}</Typography>
                        </Link>
                        {item.fork === true ? <Typography className={classes.titleFork}>Forked</Typography> : null}
                        <Typography className={classes.descriptionRepo}>{item.description}</Typography>
                        <List className={classes.rootRepo}>
                          <ListItem className={classes.listRepo}>
                            <ListItemText className={classes.pinItem} primary={item.language} />
                          </ListItem>
                          {item.forks === 0 ? "" :
                            <ListItem className={classes.listRepo}>
                              <svg aria-label="fork" className="octicon octicon-repo-forked" viewBox="0 0 10 16" version="1.1" width="10" height="16" role="img"><path fillRule="evenodd" d="M8 1a1.993 1.993 0 0 0-1 3.72V6L5 8 3 6V4.72A1.993 1.993 0 0 0 2 1a1.993 1.993 0 0 0-1 3.72V6.5l3 3v1.78A1.993 1.993 0 0 0 5 15a1.993 1.993 0 0 0 1-3.72V9.5l3-3V4.72A1.993 1.993 0 0 0 8 1zM2 4.2C1.34 4.2.8 3.65.8 3c0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2zm3 10c-.66 0-1.2-.55-1.2-1.2 0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2zm3-10c-.66 0-1.2-.55-1.2-1.2 0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2z"></path></svg>
                              <ListItemText className={classes.pinItem} primary={item.forks} />
                            </ListItem>
                          }
                          {item.stargazers_count === 0 ? "" :
                            <ListItem className={classes.listRepo}>
                              <svg aria-label="star" className="octicon octicon-star" viewBox="0 0 14 16" version="1.1" width="14" height="16" role="img"><path fillRule="evenodd" d="M14 6l-4.9-.64L7 1 4.9 5.36 0 6l3.6 3.26L2.67 14 7 11.67 11.33 14l-.93-4.74L14 6z"></path></svg>
                              <ListItemText className={classes.pinItem} primary={item.stargazers_count} />
                            </ListItem>
                          }
                        </List>

                      </Grid>
                      <Grid item xs={1}>
                        <Button
                          variant="contained"
                          fullWidth
                          onClick={item.stargazers_count === 0 ? (() => this.handelSatrs(item.name)) : (() => this.handelUnSatrs(item.name))}
                        >
                          {item.stargazers_count === 0 ? 'Star' : 'Unstar'}
                        </Button>
                      </Grid>
                    </Grid>
                    <div className={classes.repoItem}>
                    </div>
                  </Grid>
                ))

              )
              }
            </Grid>
          </Grid>
        </Grid>
      </section>
    );
  }
}

export default withStyles(styles)(withRouter(Repositories));
