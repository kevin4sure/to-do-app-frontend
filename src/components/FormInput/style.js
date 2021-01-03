
import { makeStyles, withStyles, createMuiTheme } from '@material-ui/core/styles';

const useStyles = colors =>
  makeStyles(theme => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      fieldset: {
        borderColor: colors.bodyFont,
      },
    },
    margin: {
      marginTop: theme.spacing(1),
    },
    withoutLabel: {
      marginTop: theme.spacing(3),
    },
    textField: {
      width: '25ch',
    },
    input: {
      '& > *': {
        color: colors.bodyFont,
        padding: '12px 16px',
      },
    },
    helperText: {
      color: colors.placeholderFont,
    },
    label: {
      transform: 'none !important',
      padding: '0px 5px',
      fontSize: colors.font.medium,
      fontWeight: 300,
      color: colors.bodyFont,
      backgroundColor: colors.tilePrimary,
      marginTop: '-8px',
      marginLeft: '15px',
    },
    formBorder: {
      borderColor: colors.bodyFont,
      borderWidth: '1px',
      borderStyle: 'solid',
      borderRadius: '5px',
      paddingTop: '20px',
      height: 'calc(100% - 20px)',
      width: '100%',
      margin: '10px 0 10px 0',
    },
    formLabel: {
      color: colors.headingFont,
      lineHeight: '16px',
      margin: 0,
      background: colors.tilePrimary,
      display: 'table',
      top: '-28px',
      position: 'relative',
      fontSize: colors.font.large,
      fontWeight: 'normal',
      paddingBottom: '0px',
      marginLeft: '9px',
      padding: '0 10px',
    },
    p20: {
      padding: 20,
      boxSizing: 'border-box',
    },
    switchLabel: {
      color: colors.bodyFont,
      fontSize: colors.font.medium,
    },
    inputStartIcon: {
      cursor: 'pointer',
      color: colors.bodyFont,
      paddingLeft: 5,
      paddingRight: 5,
      margin: 0,
    },
    inputEndIcon: {
      cursor: 'pointer',
      color: colors.bodyFont,
      paddingRight: 5,
      margin: 0,
    },
  }));

export const selectStyles = colors => makeStyles(theme => ({
  margin: {
    marginTop: theme.spacing(1),
  },
  select: {
    minWidth: 200,
    background: colors.tilePrimary,
    color: colors.bodyFont,
    fontSize: colors.font.medium,
    padding: '12px 16px',
    textAlign: 'left'
  },
  label: {
    transform: 'none !important',
    padding: '0px 5px',
    fontSize: colors.font.medium,
    fontWeight: 300,
    color: colors.bodyFont, 
    backgroundColor: colors.tilePrimary,
    marginTop: '-8px',
    marginLeft: '15px'
  },

  icon:{
    color: colors.bodyFont,
    right: 12,
    position: 'absolute',
    userSelect: 'none',
    pointerEvents: 'none'
  },
  paper: {
    borderRadius: 5,
    marginTop: 8,
    background: 'none'
  },
  list: {
    paddingTop: 0,
    paddingBottom: 0,
    background: colors.tilePrimary,
    color: colors.bodyFont,
    "& li":{
      fontSize: colors.font.small,
      fontWeight: 400,
      paddingTop: 8,
      paddingBottom: 8,
    },
    "& li.Mui-selected":{
      color: colors.primary,
      background: colors.bodyBackground
    },
    "& li.Mui-selected:hover":{
      color: colors.primary,
      background: colors.bodyBackground
    }
  }
}));

export const switchStyles = colors => withStyles({
  switchBase: {
    color: colors.bodyFont,
    '&$checked': {
      color: colors.primary
    },
    '&$checked + $track': {
      backgroundColor: colors.primary,
    },
  },
  checked: {},
  track: {},
});

export const globalCss = color => createMuiTheme({
  overrides: {
    MuiFormLabel: {
      root: {
        '&$focused': {
          color: color.bodyFont,
        },
      }
    },
    MuiOutlinedInput: {
      root: {
        "& $notchedOutline": {
          borderColor: color.bodyFont,
        },
        "&:hover $notchedOutline": {
          borderColor: color.bodyFont,
        },
        "&$focused $notchedOutline": {
          borderColor: color.bodyFont,
        },
      },
      input: {
        "&:-webkit-autofill": {
          '-webkit-text-fill-color': `${color.bodyFont} !important`,
          WebkitBoxShadow: `0 0 0 1000px ${color.tilePrimary} inset`,
          borderRadius: 0
        },
        "&:-webkit-autofill:hover": {
          '-webkit-text-fill-color': `${color.bodyFont} !important`,
          WebkitBoxShadow: `0 0 0 1000px ${color.tilePrimary} inset`,
          borderRadius: 0
        },
        "&:-webkit-autofill:focus": {
          '-webkit-text-fill-color' : `${color.bodyFont} !important`,
          WebkitBoxShadow: `0 0 0 1000px ${color.tilePrimary} inset`,
          borderRadius: 0
        },
        "&:-webkit-autofill:active": {
          '-webkit-text-fill-color': color.bodyFont,
          WebkitBoxShadow: `0 0 0 1000px ${color.tilePrimary} inset`,
          borderRadius: 0
        },
      }
    }
  },
});

export default useStyles;