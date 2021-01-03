
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Select, MenuItem, FormControl, InputLabel, FormHelperText } from '@material-ui/core';
import { ExpandMore } from '@material-ui/icons';
import { withTheme } from 'styled-components';
import { MuiThemeProvider } from '@material-ui/core/styles';

import { selectStyles, globalCss } from './style';

const FormSelect = props => {
  const { theme, value, label, onSelect, items, readOnly, helperText } = props;
  const [ select, setSelect ] = useState('');
  const selectClasses = selectStyles(theme)();

  const menuProps = {
    classes: {
      paper: selectClasses.paper,
      list: selectClasses.list
    },
    anchorOrigin: {
      vertical: "bottom",
      horizontal: "left"
    },
    transformOrigin: {
      vertical: "top",
      horizontal: "left"
    },
    getContentAnchorEl: null
  };

  const handleChange = event => {
    setSelect(event.target.value);
    onSelect(event.target.value);
  };

  const iconComponent = subProps => {
    return (
      <ExpandMore id="drop-icon" className={`${subProps.className  } ${  selectClasses.icon}`}/>
    );
  };
  
  useEffect(() => {
    if (value) setSelect(value);
  }, [ value ]);

  return (
    <MuiThemeProvider theme={globalCss(theme)}>
      <FormControl fullWidth variant="outlined" className={selectClasses.margin}>
        <InputLabel shrink className={selectClasses.label} htmlFor={`select-${label}`}>{label}</InputLabel>
        <Select
          id={`select-${label}`}
          classes={{ root: selectClasses.select }}
          MenuProps={menuProps}
          IconComponent={iconComponent}
          value={select}
          readOnly={readOnly}
          onChange={handleChange}
          data-testid={`select-${label}`} // for testing
        >
          {items.map((each, index) => (
            <MenuItem key={index.toString()} className="select-item" value={index}>{each}</MenuItem>
          ))}
        </Select>
        <FormHelperText style={{ color: theme.placeholderFont }} id={`${label}-helper-text`}>{helperText}</FormHelperText>
      </FormControl>
    </MuiThemeProvider>
  );
};

FormSelect.propTypes = {
  theme: PropTypes.objectOf(PropTypes.any).isRequired,
  value: PropTypes.string,
  label: PropTypes.string,
  helperText: PropTypes.string,
  items: PropTypes.arrayOf(PropTypes.string),
  readOnly: PropTypes.bool,
  onSelect: PropTypes.func
};

FormSelect.defaultProps = {
  value: '',
  label: '',
  items: [],
  helperText: '',
  readOnly: false,
  onSelect: () => null
};

export default withTheme(FormSelect);