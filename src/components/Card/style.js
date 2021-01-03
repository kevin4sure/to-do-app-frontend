import { makeStyles } from '@material-ui/core/styles';

const useStyles = colors => makeStyles(theme => ({
  paper: {
    padding: theme.spacing(2.5),
    textAlign: 'center',
    boxShadow: 'none',
    backgroundColor: colors.tilePrimary,
    color: colors.bodyFont,
  }
}));

export default useStyles;