import makeStyles from '@material-ui/core/styles/makeStyles'

export const useStyles = makeStyles(theme => ({
  wrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing(4),
    paddingBottom: theme.spacing(2),
    borderBottom: '1px solid red',
  },
  menu: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'right',
  },
  logo: {
    margin: 0,
    padding: 0,
    fontFamily: 'Karantina, cursive',
    fontSize: theme.spacing(7.5),
    color: theme.palette.text.primary,
  },
  logoSubtitle: {
    margin: 0,
    padding: 0,
    fontSize: theme.spacing(2),
    color: theme.palette.text.primary,
  },
  signInButton: {
    padding: theme.spacing(10, 3),
    margin: theme.spacing(10, 3),
    color: 'black',
  },
}))
