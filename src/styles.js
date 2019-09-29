import style from './providers/style';
import './assets/fonts/font.css';

const styles = theme => ({
  '@global': {
    body: {
      fontFamily: theme.typography.fontFamily
    }
  },
  app: {
    display: 'flex',
    flexDirection: 'column',
    '& a': {
      textDecoration: 'none',
      color: 'inherit',
      fontFamily: theme.typography.fontFamily
    }
  },
  toolbarGap: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: `0 ${theme.spacing(1)}`,
    ...theme.mixins.toolbar
  },
  content: {
    flexGrow: 1,
    // padding: theme.spacing(3),
    // minHeight: '100vh',
    // width: '1280px',
    // margin: '0 auto',
    marginTop: theme.spacing(6),
    fontFamily: theme.typography.fontFamily
  }
});

export default style(styles);
