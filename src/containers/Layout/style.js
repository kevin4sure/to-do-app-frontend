import { makeStyles } from '@material-ui/core/styles';

const useStyles = () => makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  content: {
    flexGrow: 1,
    display: 'flex',
  },
  containerGrid: {
    padding: theme.spacing(2),
  },
  containerGridLoading: {
    position:"absolute",
    top:"50%",
    left:"50%"
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    ...theme.mixins.toolbar,
  },
}));

export default useStyles;
