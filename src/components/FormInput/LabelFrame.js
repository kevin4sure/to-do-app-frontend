
import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { withTheme } from 'styled-components';

import styles from './style';

const Frame = props => {
  const { children, theme, label } = props;
  const classes = styles(theme)();
  return (
    <div className={clsx(classes.formBorder,classes.p20)}>
      <p className={clsx(classes.formLabel, 'form-label')}>{label}</p>
      {children}
    </div>
  );
};
Frame.propTypes = {
  children: PropTypes.node,
  label: PropTypes.string,
  theme: PropTypes.objectOf(PropTypes.any).isRequired
};

Frame.defaultProps = {
  label: '',
  children: null
};

export default withTheme(Frame);