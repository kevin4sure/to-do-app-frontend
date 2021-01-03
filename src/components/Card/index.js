import React from 'react';
import PropTypes from 'prop-types';
import { Paper } from '@material-ui/core';
import { withTheme } from 'styled-components';

import useStyles from './style';

const Card = props => {
  const { theme, children } = props;
  const classes = useStyles(theme)();

  return (
    <Paper elevation={4} className={classes.paper}>
      {children}
    </Paper>
  );
};

Card.propTypes = {
  theme: PropTypes.objectOf(PropTypes.any).isRequired,
  children: PropTypes.node
};

Card.defaultProps = {
  children: null,
};

export default withTheme(Card);