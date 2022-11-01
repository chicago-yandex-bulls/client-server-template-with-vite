import makeStyles from '@material-ui/core/styles/makeStyles';

export const useStyles = makeStyles(theme => ({
  leaderRow: {
    display: 'flex',
    justifyContent: 'space-between',
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    borderBottom: '.2px solid #D9D9D966',
    alignItems: 'flex-end',
  },
  nickNameWrapper: {
    flexBasis: '200px',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'baseline',
  },
  position: {
    textTransform: 'uppercase',
    fontSize: theme.spacing(7),
    minWidth: theme.spacing(7),
  },
  nickName: {
    textTransform: 'uppercase',
    textAlign: 'left',
    fontSize: theme.spacing(6),
  },
  score: {
    textTransform: 'uppercase',
    fontSize: theme.spacing(6),
    marginLeft: 'auto',
  },
  points: {
    display: 'inline',
    marginLeft: theme.spacing(0.5),
    textTransform: 'uppercase',
    fontSize: theme.spacing(3),
    color: 'red',
  },
}));
