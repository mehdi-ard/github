import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { withRouter } from 'react-router-dom';
import { state } from 'react-beep';
import Typography from 'microcomponents/typography';
import { Link } from 'react-router-dom';
import services from 'services';
import { NavLink } from 'react-router-dom';
import Button from 'microcomponents/button';
import Modal from './modal';

const styles = theme => ({
  container: {
    maxWidth: '1140px',
    margin: '0 auto',
    paddingTop: 24
  },
  nameOwner: {
    display: 'flex',
    alignItems: 'center'
  },
  userLogin: {
    marginRight: 10,
    color: 'red'
  },
  colorLink: {
    color: '#0366d6'
  },
  titleRepo: {
    fontWeight: '600'
  },
  btnBorder: {
    border: '1px solid rgba(27,31,35,.2)',
    borderRadius: 5,
    overflow: 'hidden',
    marginLeft: 10,
    height: 35
  },
  btnInfo: {
    background: 'linear-gradient(-180deg,#f0f3f6,#e6ebf1 90%)',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    padding: '0 10px',
    fontSize: 15,
    cursor: 'pointer',
    '& svg': {
      marginLeft: 10
    }
  },
  countItem: {
    background: '#fff',
    padding: '0 10px',
    height: '100%',
    display: "flex",
    alignItems: "center",
  },
  flexEnd: {
    justifyContent: 'flex-end'
  },
  link: {
    padding: '7px 15px 8px',
    color: '#586069 !important',
    whiteSpace: 'nowrap',
    border: '1px solid transparent',
    borderTop: '3px solid transparent',
    borderRadius: '3px 3px 0 0',
    display: 'flex',
    alignItems: 'center',
    height: 44,
    '& svg': {
      marginLeft: 10
    }
  },
  active: {
    color: '#24292e !important',
    backgroundColor: '#fff',
    borderColor: '#e36209 #e1e4e8 transparent'
  },
  navMenuPage: {
    padding: 0,
    display: 'flex',
    listStyle: 'none',
    marginBottom: 0
  },
  body: {
    background: '#fff',
    height: '100%'
  },
  content: {
    width: '100%',
    border: '1px solid #eaecef!important',
    borderRadius: 5,
    padding: 24,
    marginTop: 24,
    marginBottom: 24,
    textAlign: 'center'
  },
  createIssues: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  boxIssues: {
    width: '100%',
    border: '1px solid #eaecef!important',
    borderRadius: 5,
    padding: '80px 40px'
  },
  noIssues: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center'
  },
  welcomeIssues: {
    marginTop: 30,
    marginBottom: 20
  }
});

class Issues extends React.Component {
  state = {
    data: '',
    issues: '',
    openDialog: false,
    title: '',
    comment: ''
  }

  componentDidMount() {
    this.loadSingelRepo()
    this.loadIssues()
  }

  loadSingelRepo = async () => {
    const { match } = this.props;
    const owner = state.user.login;
    const repo = match.params.repo;
    const data = await services.repo.singleRepo({ owner, repo })
    const res = await data.json()
    this.setState({
      data: res
    })
    console.log('data', res)
  }

  loadIssues = async () => {
    const { match } = this.props;
    const owner = state.user.login;
    const repo = match.params.repo;
    const data = await services.repo.issues({ owner, repo })
    const res = await data.json()
    this.setState({
      issues: res
    })
  }

  handelOpenIssues = () => {
    this.setState({
      openDialog: true
    })
  }
  handelNewIssues = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  onClose = () => {
    this.setState({
      openDialog: false
    })
  }

  sendIssues = async () => {
    const { title, comment } = this.state;
    const model = { title, body: comment }
    const { match } = this.props;
    const owner = state.user.login;
    const repo = match.params.repo;
    const data = await services.repo.addIssues({ owner, repo, model })
    await data.json()
    this.loadIssues()
    if (data.ok) {
      this.setState({
        openDialog: false
      })
    }

  }


  render() {

    const { classes } = this.props;
    const { data, issues, openDialog, title,
      comment } = this.state
    return (
      <section>
        <div className={[classes.headerBox, classes.container].join(' ')}>
          <Grid container justify='space-between' alignItems='center'>
            <Grid item xs={4} className={classes.nameOwner}>
              <svg className="octicon octicon-repo" viewBox="0 0 12 16" version="1.1" width="12" height="16" aria-hidden="true"><path fillRule="evenodd" d="M4 9H3V8h1v1zm0-3H3v1h1V6zm0-2H3v1h1V4zm0-2H3v1h1V2zm8-1v12c0 .55-.45 1-1 1H6v2l-1.5-1.5L3 16v-2H1c-.55 0-1-.45-1-1V1c0-.55.45-1 1-1h10c.55 0 1 .45 1 1zm-1 10H1v2h2v-1h3v1h5v-2zm0-10H2v9h9V1z"></path></svg>
              <Typography className={[classes.userLogin, classes.colorLink].join(' ')}><Link to={'/'}>{state.user.login}</Link></Typography>
              <Typography className={classes.colorLink}>/</Typography>
              <Typography className={[classes.colorLink, classes.titleRepo].join(' ')}>
                <Link to={`/${state.user.login}/${data.name}`}>{data.name}</Link>
              </Typography>
            </Grid>
            <Grid item xs={4} className={[classes.nameOwner, classes.flexEnd].join(' ')}>
              <div className={[classes.nameOwner, classes.btnBorder].join(' ')}>
                <Typography className={classes.btnInfo}>
                  <svg className="octicon octicon-eye v-align-text-bottom" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fillRule="evenodd" d="M8.06 2C3 2 0 8 0 8s3 6 8.06 6C13 14 16 8 16 8s-3-6-7.94-6zM8 12c-2.2 0-4-1.78-4-4 0-2.2 1.8-4 4-4 2.22 0 4 1.8 4 4 0 2.22-1.78 4-4 4zm2-4c0 1.11-.89 2-2 2-1.11 0-2-.89-2-2 0-1.11.89-2 2-2 1.11 0 2 .89 2 2z"></path></svg>
                  Unwatch</Typography>
                <Typography className={classes.countItem}>{data.watchers_count}</Typography>
              </div>

              <div className={[classes.nameOwner, classes.btnBorder].join(' ')}
                onClick={data.stargazers_count === 0 ? this.handelSatrs : this.handelUnSatrs}>
                <Typography className={classes.btnInfo}>
                  <svg className="octicon octicon-star v-align-text-bottom" viewBox="0 0 14 16" version="1.1" width="14" height="16" aria-hidden="true"><path fillRule="evenodd" d="M14 6l-4.9-.64L7 1 4.9 5.36 0 6l3.6 3.26L2.67 14 7 11.67 11.33 14l-.93-4.74L14 6z"></path></svg>                  {data.stargazers_count === 0 ? 'Star' : 'Unstar'}
                </Typography>
                <Typography className={classes.countItem}>{data.stargazers_count}</Typography>
              </div>

              <div className={[classes.nameOwner, classes.btnBorder].join(' ')}>
                <Typography className={classes.btnInfo}>
                  <svg className="octicon octicon-repo-forked v-align-text-bottom" viewBox="0 0 10 16" version="1.1" width="10" height="16" aria-hidden="true"><path fillRule="evenodd" d="M8 1a1.993 1.993 0 0 0-1 3.72V6L5 8 3 6V4.72A1.993 1.993 0 0 0 2 1a1.993 1.993 0 0 0-1 3.72V6.5l3 3v1.78A1.993 1.993 0 0 0 5 15a1.993 1.993 0 0 0 1-3.72V9.5l3-3V4.72A1.993 1.993 0 0 0 8 1zM2 4.2C1.34 4.2.8 3.65.8 3c0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2zm3 10c-.66 0-1.2-.55-1.2-1.2 0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2zm3-10c-.66 0-1.2-.55-1.2-1.2 0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2z"></path></svg>                  Fork
                  </Typography>
                <Typography className={classes.countItem}>{data.forks}</Typography>
              </div>

            </Grid>
          </Grid>
          <div>
            <ul
              className={classes.navMenuPage}
            >
              <li className={classes.appBarMenuItem}>
                <NavLink
                  exact={true}
                  to={`/${state.user.login}/${data.name}`}
                  activeClassName={classes.active}
                  className={classes.link}
                >
                  <svg className="octicon octicon-code" viewBox="0 0 14 16" version="1.1" width="14" height="16" aria-hidden="true"><path fillRule="evenodd" d="M9.5 3L8 4.5 11.5 8 8 11.5 9.5 13 14 8 9.5 3zm-5 0L0 8l4.5 5L6 11.5 2.5 8 6 4.5 4.5 3z"></path></svg>
                  Code
                </NavLink>
              </li>
              <li className={classes.appBarMenuItem}>
                <NavLink
                  exact={true}
                  to={`/${state.user.login}/${data.name}/issues`}
                  activeClassName={classes.active}
                  className={classes.link}
                >
                  <svg className="octicon octicon-issue-opened" viewBox="0 0 14 16" version="1.1" width="14" height="16" aria-hidden="true"><path fillRule="evenodd" d="M7 2.3c3.14 0 5.7 2.56 5.7 5.7s-2.56 5.7-5.7 5.7A5.71 5.71 0 0 1 1.3 8c0-3.14 2.56-5.7 5.7-5.7zM7 1C3.14 1 0 4.14 0 8s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7zm1 3H6v5h2V4zm0 6H6v2h2v-2z"></path></svg>
                  Issues
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
        <div className={classes.body}>
          <div className={classes.container}>
            <div className={classes.content}>
              <Typography variant="h6">Label issues and pull requests for new contributors</Typography>
              <Typography>Now, GitHub will help potential first-time contributors <Link to={'/'}>discover issues</Link></Typography>
              <Typography>labeled with help wanted or good first issue</Typography>
            </div>
            <div className={classes.createIssues}>
              <div></div>
              <div>
                <Button variant="contained" color="secondary" onClick={this.handelOpenIssues}>New issue</Button>
              </div>
            </div>

            {issues.length === 0 ?
              <div className={classes.boxIssues}>
                <div className={classes.noIssues}>
                  <svg height="40" className="octicon octicon-issue-opened blankslate-icon" viewBox="0 0 14 16" version="1.1" width="35" aria-hidden="true"><path fillRule="evenodd" d="M7 2.3c3.14 0 5.7 2.56 5.7 5.7s-2.56 5.7-5.7 5.7A5.71 5.71 0 0 1 1.3 8c0-3.14 2.56-5.7 5.7-5.7zM7 1C3.14 1 0 4.14 0 8s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7zm1 3H6v5h2V4zm0 6H6v2h2v-2z"></path></svg>
                  <Typography variant="h4" className={classes.welcomeIssues}>Welcome to Issues!</Typography>
                  <Typography>Issues are used to track todos, bugs, feature requests, and more. As issues are created, they’ll appear here in a searchable and filterable list. To get started, you should create an issue.</Typography>
                </div>
              </div>
              :
              <div className={classes.boxIssuesShow}>
                {issues.map((item, index) => (
                  <div key={index}>
                    <div>
                      <svg class="octicon octicon-issue-opened open" viewBox="0 0 14 16" version="1.1" width="14" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7 2.3c3.14 0 5.7 2.56 5.7 5.7s-2.56 5.7-5.7 5.7A5.71 5.71 0 0 1 1.3 8c0-3.14 2.56-5.7 5.7-5.7zM7 1C3.14 1 0 4.14 0 8s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7zm1 3H6v5h2V4zm0 6H6v2h2v-2z"></path></svg>
                    </div>
                    <div>
                      <Typography>{item.title}</Typography>
                      <Typography>
                        #{item.number}
                        {item.state}
                      </Typography>
                    </div>
                  </div>
                ))}
              </div>
            }

          </div>
        </div>

        <Modal
          title="New Issues"
          openDialog={openDialog}
          onClose={this.onClose}
          titleValue={title}
          commentValue={comment}
          onchangeTitle={this.handelNewIssues('title')}
          onchangeComment={this.handelNewIssues('comment')}
          buttonAgree={this.sendIssues}
        />

      </section>
    );
  }
}

export default withStyles(styles)(withRouter(Issues));
