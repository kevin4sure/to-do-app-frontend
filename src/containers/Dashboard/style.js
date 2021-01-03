 
import { makeStyles } from '@material-ui/core/styles';

const useStyles = colors => makeStyles(() => ({
  header: {
    color: colors.headingFont
  }
}));

export default useStyles;