import makeStyles from '@material-ui/core/styles/makeStyles';

export const useStyles = makeStyles(() => ({
  wrapper: {
    position: 'absolute',
    width: 80,
    height: 80,
    pointerEvents: 'none',
    transform: 'translate(-50%, -50%)',
    zIndex: 1000000,
  },
}));
