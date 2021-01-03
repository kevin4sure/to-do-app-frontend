
import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Toolbar, AppBar, Typography } from '@material-ui/core';
import { withTheme } from 'styled-components';

import useStyles from './style';
import ThemeSection from '../ThemeSection';

const Header = props => {
  const { theme } = props;
  const classes = useStyles(theme)();

  return (
    <div>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Grid container><Typography className={classes.bold}>ToDo App</Typography></Grid>
          <Grid container direction="row-reverse" alignItems="center">
            <Grid item>
              <Grid container direction="column" justify="center" alignItems="flex-end" >
                <Grid item>
                  <ThemeSection />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </div>
  );
};

Header.propTypes = {
  theme: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default withTheme(Header);
