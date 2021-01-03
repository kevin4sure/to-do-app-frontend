import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ErrorBoundary extends Component {

  constructor(props) {
    super(props);
    
    this.state = {
      hasError: false
    };
  }

  static getDerivedStateFromError() {
    return {
      hasError: true
    };
  }

  componentDidCatch(error, info) {
    // eslint-disable-next-line no-console
    console.log(error);
    // eslint-disable-next-line no-console
    console.log(info);
  }

  render() {
    const { hasError } = this.state;
    const { children } = this.props;
    if(hasError) {
      return <div style={{
        margin: '0 auto',
        justifyContent: 'center',
        alignItems: 'center',
        width: 450,
      }}><h1>Something went wrong</h1></div>;
    }
    return children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node,
};

ErrorBoundary.defaultProps = {
  children: PropTypes.node,
};

export default ErrorBoundary;
