import makeStyles from '@material-ui/core/styles/makeStyles';

export const useStyles = makeStyles(() => ({
  wrapper: {
    position: 'absolute',
    width: 50,
    height: 50,
    pointerEvents: 'none',
    transform: 'translate(-50%, -50%)',
    zIndex: 1000000,
  },
}));
