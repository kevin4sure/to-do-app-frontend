
import React from 'react';
import { withTheme } from 'styled-components';
import { Grid } from '@material-ui/core';

import Bucket from "../Bucket";
 
const Dashboard = () => {
  
  return (
    <Grid container justify="center">
      <Grid item sm={12} md={6}>
        <Bucket />
      </Grid>
    </Grid>
  );
};
  
export default withTheme(Dashboard);
  