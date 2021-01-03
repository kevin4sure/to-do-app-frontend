
import { makeStyles, createMuiTheme } from '@material-ui/core/styles';

const useStyles = colors => makeStyles(() => ({
  flagStyle: {
    color: '#ffffff',
    fontSize: '1em',
    lineHeight: '1em',
  },
  pointer: {
    cursor: "pointer",
    color: colors.bodyFont
  },
}));

export const globalCss = () => createMuiTheme({
  overrides:{
    MuiListItemIcon: {
      root: {
        minWidth: 30
      }
    },
    MuiListItem: {
      root: {
        cursor: 'pointer'
      }
    }
  }
});

export const globalCssListLang = colors => createMuiTheme({
  overrides:{
    MuiListItemIcon: {
      root: {
        minWidth: 30
      }
    },
    MuiListItem: {
      root: {
        cursor: 'pointer'
      }
    },
    MuiList: {
      root: {
        backgroundColor: colors.tilePrimary,
        color: colors.bodyFont
      }
    }
  }
});

export default useStyles;
