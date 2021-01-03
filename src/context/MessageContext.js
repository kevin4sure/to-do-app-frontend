import React, { useState, createContext, useCallback } from 'react';
import { Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import PropTypes from 'prop-types';

export const MessageContext = createContext();

const Alert = subProps => <MuiAlert elevation={6} variant="filled" {...subProps} />;

export const MessageProvider = props => {

  const { children } = props;
  const [ type, setType ] = useState('error');
  const [ show, setShow ] = useState(false);
  const [ messageText, setMessageText ] = useState('');
  const [ position, setPostion ] = useState({ vertical: 'bottom', horizontal: 'left' });

  const handleClose = () => {
    setMessageText('');
    setShow(false);
  };

  const showAlert = useCallback((typeAlert, message, alertPosition = {}) => {
    setMessageText(message);
    setShow(true);
    setType(typeAlert);
    if (alertPosition && [ "top", "bottom" ].includes(alertPosition.vertical) && [ "left", "right", "center" ].includes(alertPosition.horizontal)) {
      setPostion(alertPosition);
    }
  }, []);

  return (
    <MessageContext.Provider value={{ showAlert }}>
      {children}
      <Snackbar
        anchorOrigin={position}
        autoHideDuration={6000}
        open={show}
        ContentProps={{
          'aria-describedby': 'message-id',
        }}
        onClose={handleClose}
      >
        <Alert
          severity={type}
        >
          {messageText}
        </Alert>
      </Snackbar>
    </MessageContext.Provider>
  );
};

MessageProvider.propTypes ={
  children : PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
};
