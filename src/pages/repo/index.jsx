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



const styles = theme => ({
  container: {
    maxWidth: '1140px',
    margin: '0 auto'
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
  overallSummary: {
    borderRadius: 3,
    border: '1px solid #e1e4e8',
    marginTop: 15,
    marginBottom: 15,
    '& ul': {
      margin: 0,
      padding: 0,
      listStyle: 'none',
      display: 'flex',
      justifyContent: 'space-between',
      textAlign: 'center',
      '& li': {
        width: '100%',
        '& a': {
          padding: '10px 0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          '& span': {
            marginLeft: 5
          },
          '& svg': {
            marginLeft: 5
          }
        }
      }
    },
  },
  gridTabel: {
    borderRadius: 5,
    border: '1px solid #c8e1ff',
    '& table': {
      width: '100%',
      borderCollapse: 'collapse',
      '& tr': {
        borderBottom: '1px solid #e1e4e8',
      },
      '& td': {
        paddingTop: 5,
        paddingBottom: 5
      },
      '& td:nth-child(2),td:nth-child(3)': {
        textAlign: 'center'
      },
      '& td:nth-child(1)': {
        display: 'flex',
        alignItems: 'center',
        '& svg': {
          marginLeft: 5,
          marginRight: 5
        }
      }
    }
  },
  headerTabel: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: 10,
    background: '#f1f8ff'
  },
  commitDate: {
    '& span': {
      marginRight: 5,
      marginLeft: 5
    }
  },
  userAvater: {
    width: 20,
    height: 20,
    borderRadius: 3,
    overflow: 'hidden',
    marginLeft: 10,
    '& img': {
      width: '100%',
      height: '100%',
      objectFit: 'cover'
    }
  },
  userDetail: {
    '& p': {
      fontSize: 15
    },
    '& span': {
      fontSize: 12
    }
  },
  flexUi: {
    display: 'flex'
  },
  boxReadme: {
    marginTop: 10,
    borderRadius: 5,
    border: '1px solid #d1d5da'
  },
  headerContentBox: {
    padding: '8px 16px',
    borderBottom: '1px solid #d1d5da',
    background: '#f6f8fa'
  },
  titleHeader: {
    display: 'flex',
    alignItems: 'center',
    '& svg': {
      marginLeft: 5
    }
  }
});

class SingleRepo extends React.Component {
  state = {
    data: '',
    repo: '',
    commits: '',
    commitData: '',
    commitDate: '',
    branch: '',
    releases: '',
    contained: '',
    lastCommit: '',
    contentItem: ''
  }

  componentDidMount() {
    this.loadSingelRepo()
    this.loadContentRepo()
    this.loadCommits()
    this.loadBranch()
    this.loadReleases()
    this.loadContributor()
    this.loadItemContent()
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

  loadContentRepo = async () => {
    const { match } = this.props;
    const owner = state.user.login;
    const repo = match.params.repo;
    const data = await services.repo.contentRepo({ owner, repo })
    const res = await data.json()
    let sort = res.sort(function (a, b) {
      return a.type.localeCompare(b.type)
    });
    this.setState({
      repo: sort
    })
  }



  loadCommits = async () => {
    const { match } = this.props;
    const owner = state.user.login;
    const repo = match.params.repo;
    const data = await services.repo.commits({ owner, repo })
    const res = await data.json()
    let fullDate = this.compaireDate(new Date(res[0].commit.committer.date))
    let lastCommit = this.calculationDate(new Date(res[0].commit.committer.date))
    this.setState({
      commits: res.length,
      commitData: res,
      commitDate: fullDate,
      lastCommit
    })

  }

  compaireDate = (date) => {
    let monthNames = [
      "Jan", "Feb", "Mar",
      "Apr", "May", "Jun", "Jul",
      "Aug", "Sep", "Oct",
      "Nov", "Dec"
    ];
    let day = date.getDate();
    let monthIndex = date.getMonth();
    let fullYear = date.getFullYear();

    return monthNames[monthIndex] + ' ' + day + ',' + fullYear;
  }


  calculationDate = (date) => {
    var ageDifMs = Date.now() - date;
    var ageDate = new Date(ageDifMs); // miliseconds from epoch
    if (ageDate.getUTCDate() > 30) {
      return Math.abs(ageDate.getUTCMonth()) + ' day ago';
    }
    else if (ageDate.getUTCMonth() >= 12) {
      return Math.abs(ageDate.getUTCMonth()) + 1 + ' mounth ago';
    }
    else {
      return Math.abs(ageDate.getUTCFullYear() - 1970) + ' years ago'
    }

  }

  loadBranch = async () => {
    const { match } = this.props;
    const owner = state.user.login;
    const repo = match.params.repo;
    const data = await services.repo.branch({ owner, repo })
    const res = await data.json()
    this.setState({
      branch: res.length
    })
  }

  loadReleases = async () => {
    const { match } = this.props;
    const owner = state.user.login;
    const repo = match.params.repo;
    const data = await services.repo.releases({ owner, repo })
    const res = await data.json()
    this.setState({
      releases: res.length
    })
  }

  loadContributor = async () => {
    const { match } = this.props;
    const owner = state.user.login;
    const repo = match.params.repo;
    const data = await services.repo.contributor({ owner, repo })
    const res = await data.json()
    this.setState({
      contained: res.length
    })
  }

  loadItemContent = async () => {
    const { match } = this.props;
    const owner = state.user.login;
    const repo = match.params.repo;
    const item = 'README.md'
    const data = await services.repo.contentItem({ owner, repo, item })
    const res = await data.json()
    this.setState({
      contentItem: (new Buffer(res.content, 'base64')).toString('utf8')
    })
  }

  handelSatrs = async () => {
    const { data } = this.state
    const owner = state.user.login
    const repo = data.name
    await services.repo.star({ owner, repo })
    this.loadSingelRepo()
  }

  handelUnSatrs = async () => {
    const { data } = this.state
    const owner = state.user.login
    const repo = data.name
    await services.repo.unstar({ owner, repo })
    this.loadSingelRepo()
  }


  render() {

    const { classes } = this.props;
    const { data, commits, commitData, commitDate, branch, releases, contained, repo, lastCommit,
      contentItem } = this.state
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
            <Grid container justify='space-between' alignItems='center'>
              <Grid item xs={6}>
                <Typography>{data.description}</Typography>
              </Grid>
              <Grid item xs={1}>
                <Button
                  variant="contained"
                  fullWidth
                >
                  Edit
                </Button>
              </Grid>
            </Grid>

            <div className={classes.overallSummary}>
              <ul>
                <li>
                  <Link to={'/'}>
                    <svg className="octicon octicon-history" viewBox="0 0 14 16" version="1.1" width="14" height="16" aria-hidden="true"><path fillRule="evenodd" d="M8 13H6V6h5v2H8v5zM7 1C4.81 1 2.87 2.02 1.59 3.59L0 2v4h4L2.5 4.5C3.55 3.17 5.17 2.3 7 2.3c3.14 0 5.7 2.56 5.7 5.7s-2.56 5.7-5.7 5.7A5.71 5.71 0 0 1 1.3 8c0-.34.03-.67.09-1H.08C.03 7.33 0 7.66 0 8c0 3.86 3.14 7 7 7s7-3.14 7-7-3.14-7-7-7z"></path></svg>
                    <span>{commits}</span>
                    commits
                  </Link>
                </li>
                <li>
                  <Link to={'/'}>
                    <svg className="octicon octicon-git-branch" viewBox="0 0 10 16" version="1.1" width="10" height="16" aria-hidden="true"><path fillRule="evenodd" d="M10 5c0-1.11-.89-2-2-2a1.993 1.993 0 0 0-1 3.72v.3c-.02.52-.23.98-.63 1.38-.4.4-.86.61-1.38.63-.83.02-1.48.16-2 .45V4.72a1.993 1.993 0 0 0-1-3.72C.88 1 0 1.89 0 3a2 2 0 0 0 1 1.72v6.56c-.59.35-1 .99-1 1.72 0 1.11.89 2 2 2 1.11 0 2-.89 2-2 0-.53-.2-1-.53-1.36.09-.06.48-.41.59-.47.25-.11.56-.17.94-.17 1.05-.05 1.95-.45 2.75-1.25S8.95 7.77 9 6.73h-.02C9.59 6.37 10 5.73 10 5zM2 1.8c.66 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2C1.35 4.2.8 3.65.8 3c0-.65.55-1.2 1.2-1.2zm0 12.41c-.66 0-1.2-.55-1.2-1.2 0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2zm6-8c-.66 0-1.2-.55-1.2-1.2 0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2z"></path></svg>
                    <span>{branch}</span>
                    branch
                  </Link>
                </li>
                <li>
                  <Link to={'/'}>
                    <svg className="octicon octicon-tag" viewBox="0 0 14 16" version="1.1" width="14" height="16" aria-hidden="true"><path fillRule="evenodd" d="M7.73 1.73C7.26 1.26 6.62 1 5.96 1H3.5C2.13 1 1 2.13 1 3.5v2.47c0 .66.27 1.3.73 1.77l6.06 6.06c.39.39 1.02.39 1.41 0l4.59-4.59a.996.996 0 0 0 0-1.41L7.73 1.73zM2.38 7.09c-.31-.3-.47-.7-.47-1.13V3.5c0-.88.72-1.59 1.59-1.59h2.47c.42 0 .83.16 1.13.47l6.14 6.13-4.73 4.73-6.13-6.15zM3.01 3h2v2H3V3h.01z"></path></svg>
                    <span>{releases}</span>
                    releases
                  </Link>
                </li>
                <li>
                  <Link to={'/'}>
                    <svg className="octicon octicon-organization" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fillRule="evenodd" d="M16 12.999c0 .439-.45 1-1 1H7.995c-.539 0-.994-.447-.995-.999H1c-.54 0-1-.561-1-1 0-2.634 3-4 3-4s.229-.409 0-1c-.841-.621-1.058-.59-1-3 .058-2.419 1.367-3 2.5-3s2.442.58 2.5 3c.058 2.41-.159 2.379-1 3-.229.59 0 1 0 1s1.549.711 2.42 2.088C9.196 9.369 10 8.999 10 8.999s.229-.409 0-1c-.841-.62-1.058-.59-1-3 .058-2.419 1.367-3 2.5-3s2.437.581 2.495 3c.059 2.41-.158 2.38-1 3-.229.59 0 1 0 1s3.005 1.366 3.005 4z"></path></svg>
                    <span>{contained}</span>
                    contributor
                  </Link>
                </li>
                <li>
                  <Link to={'/'}>
                    <svg className="octicon octicon-law" viewBox="0 0 14 16" version="1.1" width="14" height="16" aria-hidden="true"><path fillRule="evenodd" d="M7 4c-.83 0-1.5-.67-1.5-1.5S6.17 1 7 1s1.5.67 1.5 1.5S7.83 4 7 4zm7 6c0 1.11-.89 2-2 2h-1c-1.11 0-2-.89-2-2l2-4h-1c-.55 0-1-.45-1-1H8v8c.42 0 1 .45 1 1h1c.42 0 1 .45 1 1H3c0-.55.58-1 1-1h1c0-.55.58-1 1-1h.03L6 5H5c0 .55-.45 1-1 1H3l2 4c0 1.11-.89 2-2 2H2c-1.11 0-2-.89-2-2l2-4H1V5h3c0-.55.45-1 1-1h4c.55 0 1 .45 1 1h3v1h-1l2 4zM2.5 7L1 10h3L2.5 7zM13 10l-1.5-3-1.5 3h3z"></path></svg>
                    Unlicense
                  </Link>
                </li>
              </ul>
            </div>

            <Grid container justify="center">
              <Grid item xs={12}>
                <div className={classes.gridTabel}>
                  <div className={classes.headerTabel}>
                    <div className={classes.flexUi}>
                      <div className={classes.userAvater}>
                        <img src={state.user.avatar_url} alt="" />
                      </div>
                      <div className={classes.userDetail}>
                        <Typography>{state.user.login} <span>change background</span></Typography>
                      </div>
                    </div>
                    <div className={classes.lastUpdate}>
                      <Typography className={classes.commitDate}>
                        Last commit
                        <span>{commitData.length === 0 ? null : commitData[0].sha.substr(0, 7)}</span>
                        on
                        <span>
                          {commitData.length === 0 ? null : commitDate}
                        </span>
                      </Typography>
                    </div>
                  </div>
                  <table>
                    <tbody>
                      {repo.length === 0 ? null :
                        repo.map((item, index) => (
                          <tr key={index}>
                            <td>
                              {item.type === 'dir' ?
                                <svg aria-label="directory" className="octicon octicon-file-directory" viewBox="0 0 14 16" version="1.1" width="14" height="16" role="img"><path fillRule="evenodd" d="M13 4H7V3c0-.66-.31-1-1-1H1c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1V5c0-.55-.45-1-1-1zM6 4H1V3h5v1z"></path></svg>
                                :
                                <svg aria-label="file" className="octicon octicon-file" viewBox="0 0 12 16" version="1.1" width="12" height="16" role="img"><path fillRule="evenodd" d="M6 5H2V4h4v1zM2 8h7V7H2v1zm0 2h7V9H2v1zm0 2h7v-1H2v1zm10-7.5V14c0 .55-.45 1-1 1H1c-.55 0-1-.45-1-1V2c0-.55.45-1 1-1h7.5L12 4.5zM11 5L8 2H1v12h10V5z"></path></svg>
                              }
                              {item.name}</td>
                            <td>change background</td>
                            <td>{lastCommit}</td>
                          </tr>
                        ))}
                    </tbody>

                  </table>
                </div>
              </Grid>
            </Grid>

            <div className={classes.boxReadme}>
              <div className={classes.headerContentBox}>
                <Typography className={classes.titleHeader}>
                  <svg className="octicon octicon-book" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fillRule="evenodd" d="M3 5h4v1H3V5zm0 3h4V7H3v1zm0 2h4V9H3v1zm11-5h-4v1h4V5zm0 2h-4v1h4V7zm0 2h-4v1h4V9zm2-6v9c0 .55-.45 1-1 1H9.5l-1 1-1-1H2c-.55 0-1-.45-1-1V3c0-.55.45-1 1-1h5.5l1 1 1-1H15c.55 0 1 .45 1 1zm-8 .5L7.5 3H2v9h6V3.5zm7-.5H9.5l-.5.5V12h6V3z"></path></svg>

                  README.md
                   </Typography>
              </div>

              {contentItem}
            </div>

          </div>




        </div>
      </section>
    );
  }
}

export default withStyles(styles)(withRouter(SingleRepo));
