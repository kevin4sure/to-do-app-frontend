import React, { Suspense } from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import { compose } from 'redux';
import { connect } from "react-redux";
import { MessageProvider } from '../../context/MessageContext';
import GlobalStyle from './GlobalStyle';
import Routes from './Router';
import Loader from './Loader';

const themeFont = createMuiTheme({
  typography: {
    fontFamily: [
      'inherit'
    ].join(','),
  },
  tabs: {
    fontFamily: [
      'inherit'
    ].join(','),
  }
});

const App = props => {
  
  const { selectedTheme } = props;

  return (
    <Suspense fallback={<Loader />}>
      <Router>
        <MessageProvider>
          <ThemeProvider theme={selectedTheme}>
            <MuiThemeProvider theme={themeFont}>
              <GlobalStyle />
              <Routes />
            </MuiThemeProvider>
          </ThemeProvider>
        </MessageProvider>
      </Router>
    </Suspense>
  );
};

App.propTypes = {
  selectedTheme: PropTypes.objectOf(PropTypes.any).isRequired
};
const mapStateToProps = state => ({ selectedTheme: state.selectedTheme.themeType }); 
export default compose(connect(mapStateToProps, null))(App);
