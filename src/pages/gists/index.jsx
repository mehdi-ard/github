import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { withRouter } from 'react-router-dom';
import { state } from 'react-beep';
import Typography from 'microcomponents/typography';
import services from 'services';
import { NavLink } from 'react-router-dom';
import ModalGists from './modal'
import Slide from 'components/slide';
import { Link } from 'react-router-dom';
import Button from 'microcomponents/button'

const styles = theme => ({
  container: {
    maxWidth: '1140px',
    margin: '0 auto'
  },
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
  title: {
    textAlign: 'right'
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
  discriptEmptyGists: {
    display: 'flex',
    justifyContent: 'center',
    '& span': {
      marginLeft: 5,
      marginRight: 5,
      color: '#0366d6',
      cursor: 'pointer'
    }
  },
  emptyGists: {
    padding: 32,
    textAlign: 'center',
    width: '100%',
    '& h4': {
      marginBottom: 20
    }
  },
  imageAvatr: {
    width: 30,
    height: 30,
    overflow: 'hidden',
    borderRadius: 5,
    marginRight: 5,
    '& img': {
      width: '100%',
      height: '100%'
    }
  },
  cardGist: {
    width: '100%',
    height: 100,
    padding: theme.spacing(1.5)
  },
  avatarTitle: {
    display: 'flex'
  }


});

class Gists extends React.Component {
  state = {
    data: '',
    comment: '',
    title: '',
    openDialog: false,
    filesHeader: ''
  }
  componentDidMount() {
    this.loadGists()
  }

  loadGists = async () => {
    const owner = state.user.login
    const dataRepo = await services.gists.gistsList(owner);
    const repo = await dataRepo.json()
    const data = repo.sort()
    this.setState({
      data
    })
    console.log('data', data)
  }

  handelOpenModal = () => {
    this.setState({
      openDialog: true
    })
  }

  handelCloseModal = () => {
    this.setState({
      openDialog: false
    })
  }

  handelNewIssues = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  sendGists = async () => {
    const { title, comment, filesHeader } = this.state;
    const oModel = { title, comment, filesHeader }
    let x;
    x = oModel['filesHeader']
    const model = {
      "description": title,
      "public": true,
      "files": {
        x: {
          "content": comment
        },
      }
    }

    const data = await services.gists.addGist({ model })
    await data.json()
    if (data.ok) {
      this.setState({
        openDialog: false,
      })
    }
    this.loadGists()
  }


  render() {

    const { classes } = this.props;
    const { data, openDialog, comment, title, filesHeader } = this.state

    return (
      <section className={classes.container}>
        <Grid container spacing={2} justify="center">
          <Grid item xs={3}>
            <Slide />
          </Grid>
          <Grid item xs={8}>
            {data.length === 0 ? null :
              <Button
                size="medium"
                color={'primary'}
                variant="contained"
                onClick={this.handelOpenModal}>
                Create a gist
            </Button>
            }
            <div>
              <ul
                className={classes.navMenuPage}
              >
                <li className={classes.appBarMenuItem}>
                  <NavLink
                    exact={true}
                    to="/gists"
                    className={classes.link}
                    activeClassName={classes.active}
                  >
                    All gists <span className={classes.badgetItem}>{data.length}</span>
                  </NavLink>
                </li>
              </ul>
            </div>
            <Grid container spacing={3}>
              {data.length === 0 ?
                <div className={classes.emptyGists}>
                  <Typography variant='h4'>You don’t have any gists yet.</Typography>
                  <Typography className={classes.discriptEmptyGists}>Your public gists will show up here on your profile. <span onClick={this.handelOpenModal}> Create a gist </span> to get started.</Typography>
                </div>
                :
                data.map((item, index) => (
                  <div className={classes.cardGist} key={index}>
                    <div className={classes.avatarTitle}>
                      <div className={classes.imageAvatr}>
                        <img src={item.owner.avatar_url} alt={item.owner.login} />
                      </div>
                      <div>
                        <Link to={'/'}>
                          {item.owner.login} / {item.files.x.filename}
                        </Link>
                        <Typography>{item.description}</Typography>
                      </div>
                    </div>
                  </div>
                ))
              }
            </Grid>
          </Grid>
        </Grid>

        <ModalGists
          title="New Gists"
          openDialog={openDialog}
          onClose={this.handelCloseModal}
          titleValue={title}
          commentValue={comment}
          filesHeader={filesHeader}
          onchangeTitle={this.handelNewIssues('title')}
          onchangeComment={this.handelNewIssues('comment')}
          onchangeFilesHeader={this.handelNewIssues('filesHeader')}
          buttonAgree={this.sendGists}
        />
      </section>
    );
  }
}

export default withStyles(styles)(withRouter(Gists));
