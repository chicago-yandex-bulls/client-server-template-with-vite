import makeStyles from '@material-ui/core/styles/makeStyles';

const SPACE_BETWEEN = 'space-between';
const FONT_FAMILY = 'Karantina, cursive';
export const useStyles = makeStyles(theme => ({
  leaderBoard: {
    padding: theme.spacing(1, 4, 4),
    backgroundColor: '#00000008',
    borderRadius: theme.spacing(1),
  },
  leaderRow: {
    display: 'flex',
    justifyContent: 'space-between',
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    borderBottom: '.2px solid #D9D9D966',
    alignItems: 'flex-end',
  },
  header: {
    display: 'flex',
    justifyContent: SPACE_BETWEEN,
    alignItems: 'flex-end',
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  nickNameWrapper: {
    flexBasis: '200px',
    display: 'flex',
    justifyContent: SPACE_BETWEEN,
    alignItems: 'baseline',
  },
  position: {
    textTransform: 'uppercase',
    fontFamily: FONT_FAMILY,
    fontSize: theme.spacing(7),
  },
  nickName: {
    textTransform: 'uppercase',
    fontFamily: FONT_FAMILY,
    fontSize: theme.spacing(6),
  },
  score: {
    textTransform: 'uppercase',
    fontFamily: FONT_FAMILY,
    fontSize: theme.spacing(6),
  },
  points: {
    display: 'inline',
    marginLeft: theme.spacing(0.5),
    textTransform: 'uppercase',
    fontFamily: FONT_FAMILY,
    fontSize: theme.spacing(3),
    color: 'red',
  },
  top5: {
    textTransform: 'uppercase',
    fontFamily: FONT_FAMILY,
    fontSize: theme.spacing(7.5),
    color: theme.palette.text.primary,
    '& span': {
      color: 'red',
      fontSize: theme.spacing(12),
    },
  },
  title: {
    textTransform: 'uppercase',
    fontFamily: FONT_FAMILY,
    fontSize: theme.spacing(7.5),
    color: theme.palette.text.primary,
  },
}));
