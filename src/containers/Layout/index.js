
import React, { lazy, Suspense } from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';
import { Container, Grid, CircularProgress  } from '@material-ui/core';
import { withTheme } from 'styled-components';

import Header from '../../components/Header';
import useStyles from './style';

const Dashboard = lazy(() =>  import('../Dashboard'));
const Task = lazy(() => import('../Task'));
const PageNotFound = lazy(() =>  import('../../components/PageNotFound'));

const LayoutPage = props => {
  const { theme } = props;
  const classes = useStyles(theme)();

  return (
    <div className={classes.root}>
      <Header />
      <main className={classes.content}>
        <Container maxWidth={false} className={classes.containerGrid}>
          <div className={classes.toolbar} />
          <Suspense fallback={<div className={classes.containerGridLoading}><CircularProgress color="inherit" /></div>}>
            <Grid container spacing={2}>
              <Switch>
                <Route path="/" component={() => <Dashboard />} exact />
                <Route path="/bucket/:bucket_id/tasks" component={() => <Task />} exact />
                <Route component={() => <PageNotFound />} />
              </Switch>
            </Grid>
          </Suspense>
        </Container>
      </main>
    </div>
  );
};

LayoutPage.propTypes = {
  theme: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default withTheme(LayoutPage);
