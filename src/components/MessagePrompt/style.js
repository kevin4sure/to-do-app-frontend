
import { makeStyles } from '@material-ui/core';

const useStyles = colors => makeStyles(theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
    backgroundColor: `${colors.bodyBackground}d4`,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  closeButton: {
    position: 'absolute',
    top: '5px',
    right: '10px',
    color: colors.bodyFont
  },
  heading:{
    fontSize: colors.font.extraLarge,
    color: colors.headingFont
  },
  dialogContent: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    paddingTop: theme.spacing(6),
    paddingBottom: theme.spacing(8),
    backgroundColor: colors.tilePrimary,
    height: 'auto',
    overflow: 'hidden'
  },
  dialogContentRunWorkLoad: {
    padding: theme.spacing(2),
    backgroundColor: colors.tilePrimary,
    overflow: 'hidden'
  },
  dialogContentContainer: {
    color: colors.headingFont,
    fontSize: colors.font.extraLarge,
  },
  primaryButtonSubmit:{
    backgroundColor: colors.buttonPrimary,
    color: colors.headingFont,
    fontSize: colors.font.small,
    fontWeight: 600,
    '&:hover':{
      backgroundColor: `rgb(${colors.palette.white})`,
      color: `${colors.primary} !important`,
      fontSize: colors.font.small,
    }
  },
  secondaryButtonCancel:{
    color: `${colors.primary} !important`,
    backgroundColor: colors.buttonSecondary,
    fontSize: colors.font.small,
    fontWeight: 600,
    '&:hover':{
      backgroundColor: `rgb(${colors.palette.white})`,
      color: colors.headingFont,
      fontSize: colors.font.small,
    }
  },
  secondaryButton:{
    color: colors.bodyBackground,
    backgroundColor: colors.buttonSecondary,
    fontSize: colors.font.small,
    minWidth: '135px'
  },
  secondaryButtonConform:{
    color: colors.bodyBackground,
    backgroundColor: colors.buttonSecondary,
    fontSize: colors.font.small,
    "&:hover": {
      background: "#efefef"
    },
  },
  dialogActions: {
    margin: 0,
    padding: theme.spacing(1),
  },
  dialogBackground: {
    backgroundColor: '#000'
  },
  dialogWorkLoad:{
    minHeight: 150,
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex'
  },
  footerBackground:{
    backgroundColor: `${colors.bodyBackground}d4`,
  },
  promtIcon:{
    width: 25, 
    height: 'auto',
    marginRight: 8
  }
}));

export default useStyles;