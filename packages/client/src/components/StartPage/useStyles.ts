import { grey, red } from '@material-ui/core/colors';
import makeStyles from '@material-ui/core/styles/makeStyles';

export const useStyles = makeStyles(() => ({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  title: {
    fontSize: '70px',
    margin: '32px 0',
    color: grey['50'],
    backgroundColor: grey['900'],
    fontWeight: 'bold',
    padding: '0 10px',
  },
  menu: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: '100px',
  },
  menuItem: {
    margin: '10px 0',
    fontSize: '30px',
    color: 'black',
    cursor: 'pointer',
    textDecoration: 'none',

    '&:hover': {
      color: `${red.A400}`,
    },
  },
  previewCanvas: {
    display: 'flex',
    justifyContent: 'center',
  },
}));
