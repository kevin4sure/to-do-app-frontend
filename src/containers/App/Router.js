
import React, { lazy, Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
  
import { withTheme } from 'styled-components';
import GlobalStyle from './GlobalStyle';
import ErrorBoundary from './ErrorBoundary';
  
const LayoutPage = lazy(() =>  import('../Layout'));
  
const Routes = () => {
  return (
    <Suspense fallback="">
      <ErrorBoundary>
        <Switch>
          <Route path='/' component={()=> <LayoutPage />} />
          <GlobalStyle />
        </Switch>
      </ErrorBoundary>
    </Suspense>
  );
};
  
export default withTheme(Routes);
  