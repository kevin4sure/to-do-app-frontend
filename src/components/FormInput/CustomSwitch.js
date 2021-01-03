
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FormControlLabel, Switch, Typography } from '@material-ui/core';
import { withTheme } from 'styled-components';
import useStyles, { switchStyles } from './style';

const CustomSwitch = props => {
  const { theme, checked, readOnly, onChange, label, labelPosition } = props;
  const [ isChecked, setIsChecked ] = useState(false);
  const StyledSwitch = switchStyles(theme)(Switch);
  const classes = useStyles(theme)();

  const handleChange = () => {
    setIsChecked(!isChecked);
    onChange(!isChecked);
  };

  useEffect(() => {
    if (checked) setIsChecked(checked);
  }, [ checked ]);

  return (
    <FormControlLabel
      control={<StyledSwitch className="switch-btn" readOnly={readOnly} checked={isChecked} onChange={handleChange} />}
      label={<Typography className={classes.switchLabel}>{label}</Typography>}
      labelPlacement={labelPosition}
    />
  );
};

CustomSwitch.propTypes = {
  theme: PropTypes.objectOf(PropTypes.any).isRequired,
  onChange: PropTypes.func,
  label: PropTypes.string,
  checked: PropTypes.bool,
  readOnly: PropTypes.bool,
  labelPosition: PropTypes.oneOf([ "top","bottom","start","end" ]),
};

CustomSwitch.defaultProps = {
  onChange: () => null,
  label: '',
  checked: false,
  readOnly: false,
  labelPosition: "end",
};

export default withTheme(CustomSwitch);