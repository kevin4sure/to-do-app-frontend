
import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { FormControl, InputAdornment, InputLabel, OutlinedInput, FormHelperText, MuiThemeProvider } from '@material-ui/core';
import { withTheme } from 'styled-components';

import useStyles, { globalCss } from './style';

const TextInput = props => {
  const { theme, label, helperText, error, icon, onIconClick, onChange, leftIcon, ...textProps } = props;
  const classes = useStyles(theme)();

  const handleIconClick = () => {
    onIconClick();
  };

  const handleChange = e => onChange(e.target.value);

  return (
    <MuiThemeProvider theme={globalCss(theme)}>
      <FormControl  fullWidth className={classes.margin} variant="outlined">
        <InputLabel shrink className={clsx(classes.label, 'input-label')} htmlFor={`input-${label}`}>{label}</InputLabel>
        <OutlinedInput
          id={`input-${label}`}
          error={error}
          className={classes.input}
          startAdornment={(leftIcon && <InputAdornment className={clsx(classes.inputStartIcon, 'start-icon')} position="start">{leftIcon}</InputAdornment>)}
          endAdornment={(icon && <InputAdornment onClick={handleIconClick} className={clsx(classes.inputEndIcon, 'end-icon')} position="end">{icon}</InputAdornment>)}
          onChange={handleChange}
          inputProps={{
            "aria-describedby": `${label}-helper-text`,
          }}
          {...textProps}
        />
        <FormHelperText error={error} className={clsx(classes.helperText,{ 'error':error }, 'helper-text')} variant="standard" id={`${label}-helper-text`}>{helperText}</FormHelperText>
      </FormControl>
    </MuiThemeProvider>
  );
};

TextInput.propTypes = {
  theme: PropTypes.objectOf(PropTypes.any).isRequired,
  label: PropTypes.string,
  icon: PropTypes.node,
  leftIcon: PropTypes.node,
  helperText: PropTypes.string,
  onIconClick: PropTypes.func,
  onChange: PropTypes.func,
  error: PropTypes.bool
};

TextInput.defaultProps = {
  label: '',
  icon: null,
  leftIcon:  null,
  helperText: '',
  onIconClick: () => null,
  onChange: () => null,
  error: false
};

export default withTheme(TextInput);