import style from 'providers/style';

const styles = theme => ({
  iconClass: {
    background: 'transparent',
    '&:hover': {
      background: 'transparent !important'
    },
    '&:focus': {
      background: 'transparent !important'
    },
    '&:active': {
      background: 'transparent !important'
    },
    composes: 'cypress-drop-down-menu'
  },

  bar: {
    width: '100%',
    height: 64,
    backgroundColor: '#24292e',
    boxShadow: 'none',
    position: 'relative',
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },

  iconGit: {
    width: 40,
    height: 40
  },
  headerLink: {
    color: '#fff !important',
    "& fill": {
      color: '#fff !important',
    }
  },
  iconAvatar: {
    display: 'flex'
  },
  userHeaderAvatar: {
    width: 20,
    height: 20,
    overflow: 'hidden',
    borderRadius: 5,
    '& img': {
      width: '100%',
      height: '100%',
      objectFit: 'contain'
    }
  },



  '@media screen and (max-width: 768px)': {
    header_nav_hemberger: {
      display: 'block !important'
    },
    menu: {
      order: 1,
      alignItems: 'center',
      justifyContent: 'flex-start'
    },
    logobar: {
      order: 2,
      justifyContent: 'center'
    },
    userProfile: {
      order: 3
    },
    mobileProfile: {
      display: 'none'
    },
    appBartitle: {
      display: 'none'
    },
    iconUserMobile: {
      display: 'block'
    },
    appBarMenu: {
      position: 'fixed',
      width: '100%',
      top: 0,
      height: '100%',
      left: 0,
      background: '#fff',
      zIndex: 5,
      transform: 'translateX(-100%)',
      transition: 'all 0.6s cubic-bezier(0.77, 0, 0.175, 1)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
      paddingTop: '4em',
      paddingLeft: '1em',
      '& li': {
        height: '3em'
      }
    },
    active: {
      '&::before': {
        display: 'none'
      }
    },
    header__menu__show: {
      transform: 'translateX(0)'
    }
  }
});

export default style(styles);
