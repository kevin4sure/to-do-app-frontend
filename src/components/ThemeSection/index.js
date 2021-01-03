
import React, { useState, memo } from 'react';
import PropTypes from 'prop-types';
import { withTheme } from 'styled-components';
import { Popover, List, ListItem, ListItemText, MuiThemeProvider } from '@material-ui/core';
import { useDispatch, connect } from "react-redux";
import { compose } from 'redux';

import { ArrowDropDown } from '@material-ui/icons';
import useStyles, { globalCss, globalCssListLang } from './style';
import ThemeList from '../../utils/ThemeList';
import selectedThemeAction from './action';

const ThemeSection = props => {

  const { theme, selectedTheme } = props;
  const classes = useStyles(theme)();
  const [ anchorEl, setAnchorEl ] = useState(null);
  const dispatch = useDispatch();
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const changeTheme = value => {
    const temp = ThemeList.find(each => each.keyFlag === value);
    if(temp) {
      dispatch(selectedThemeAction(temp));
    }
    setAnchorEl(null);
  };

  return (
    <MuiThemeProvider theme={globalCss(theme)}>
      <List dense>
        <ListItem  onClick={handleClick}>
          <ListItemText primary={selectedTheme.LabelText} />
          <ListItemText
            primary={<ArrowDropDown className={classes.pointer}/>}
          />
        </ListItem>
      </List>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <MuiThemeProvider theme={globalCssListLang(theme)}>
          <List dense>
            {ThemeList.map((each, index) => (
              <ListItem key={index.toString()} 
                onClick={() => changeTheme(each.keyFlag)}
              >
                <ListItemText
                  primary={each.LabelText}
                />
              </ListItem>
            ))}
          </List>
        </MuiThemeProvider>
      </Popover>
    </MuiThemeProvider>
  );
};

ThemeSection.propTypes = {
  theme: PropTypes.objectOf(PropTypes.any).isRequired,
  selectedTheme: PropTypes.objectOf(PropTypes.any).isRequired
};

const mapStateToProps = state => {
  return { selectedTheme: state.selectedTheme };
};

export default compose(connect(mapStateToProps, null))(withTheme(memo(ThemeSection)));
