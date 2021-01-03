
import React from 'react';
import { withTheme } from 'styled-components';
import { Grid, Typography } from '@material-ui/core';

const Task = () => {
  
  return (
    <Grid container justify="center">
      <Grid item sm={12} md={6}>
        <Typography>Task list</Typography>
      </Grid>
    </Grid>
  );
};
  
export default withTheme(Task);