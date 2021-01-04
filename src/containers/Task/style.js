import { makeStyles } from '@material-ui/core/styles';

const useStyles = colors => makeStyles(theme => ({
  header: {
    fontSize: colors.font.large*2,
    fontWeight: 600,
    color: colors.bodyFont
  },
  body: {
    color: colors.placeholderFont
  },
  primaryButton:{
    backgroundColor: colors.buttonPrimary,
    color: colors.headingFont,
    fontSize: colors.font.small,
    fontWeight: 400,
    '&:hover':{
      backgroundColor: `rgb(${colors.palette.white})`,
      color: `${colors.primary} !important`,
      fontSize: colors.font.small,
    }
  },
  divider: {
    height: 2, 
    width: '100%', 
    backgroundColor: colors.tilePrimary,
    marginBottom: theme.spacing(2),
    marginTop: theme.spacing(1),
  },
  label: {
    color: colors.bodyFont
  },
  strike: {
    textDecorationLine: "line-through",
    color: colors.placeholderFont
  },
  danger: {
    color: `rgb(${colors.palette.red})`,
  }
}));

export default useStyles;