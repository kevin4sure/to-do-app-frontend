
import React, { useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, Typography } from '@material-ui/core';
import { withTheme } from 'styled-components';

import useStyles from './style';

const YesNo = props => {
  const { theme, show, title, message, onYesClick, onNoClick } = props;
  const [ open, setOpen ] = useState(false);
  const classes = useStyles(theme)();

  const handleYes = useCallback(() => {
    onYesClick();
    setOpen(false);
  }, [ onYesClick ]);

  const handleNo = useCallback(() => {
    onNoClick();
    setOpen(false);
  }, [ onNoClick ]);

  const handleClose = useCallback(() => {
    setOpen(false);
    onNoClick();
  }, [ onNoClick ]);

  useEffect(() => {
    setOpen(show);
  }, [ show ]);

  return (
    <div id="DialogOut">
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="sm" fullWidth
      >
        <DialogTitle disableTypography className={classes.root} onClose={handleClose} id="closeIcon" >
          <Typography className={classes.heading}>{title}</Typography>
        </DialogTitle>
        <DialogContent className={clsx(classes.dialogContentRunWorkLoad, classes.dialogWorkLoad)}>
          <DialogContentText id="alert-dialog-description" className={classes.dialogContentContainer}>
            {message}
          </DialogContentText>
        </DialogContent>
        <DialogActions className={clsx(classes.dialogContentRunWorkLoad, classes.footerBackground)}>
          <Button id="nobtn" onClick={handleNo} variant="text" color="primary" autoFocus className={classes.secondaryButtonConform}>
            No
          </Button>
          <Button id="yesbtn" onClick={handleYes} variant="text" color="primary" autoFocus className={classes.secondaryButtonConform}>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

YesNo.propTypes = {
  theme: PropTypes.objectOf(PropTypes.any).isRequired,
  show: PropTypes.bool,
  title: PropTypes.string,
  message: PropTypes.string,
  onYesClick: PropTypes.func,
  onNoClick: PropTypes.func
};

YesNo.defaultProps = {
  show: false,
  title: '',
  message: '',
  onYesClick: () => null,
  onNoClick: () => null
};

export default withTheme(YesNo);