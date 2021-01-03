
import React, { useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { Dialog, DialogTitle, DialogContent, DialogActions, Typography, Button, Grid } from "@material-ui/core";
import { withTheme } from "styled-components";

import useStyles from './style';

/**
 * A component that can be used to display pop-up or dialog box.
 * it receives any react component for content,
 * also, dynamic action buttons can also be provided with dynamic button labels.
 * 
 * 
 * @param {bool} show  use to control display from parent
 * @param {string} size maximum conainer size of the message body
 * @param {node} title title of the message prompt to be displayed, can also be compoennt
 * @param {node} message content of the message prompt to be displayed 
 * @param {func} onClose to execute function passed from parent on dialog close event
 * @param {array} buttons list of objects having "label" and respective "action" fields. example: [{label:"Ok", action: () => null}]
 * 
 * @example
 *    <Prompt show={show} size="md | sm | lg" onClose={funcToFalseShow} title="Create New Workload" message={<AnyComponent />} buttons={[ { label: 'submit', action: ()=> {} } ]} />
 */
const Prompt = props => {
  const { theme, show, size, title, message, onClose, buttons, id } = props;
  const [ open, setOpen ] = useState(false);
  const classes = useStyles(theme)();

  /**
   * function to be called to handle dialog close event
   */
  const handleClose = useCallback(() => {
    setOpen(false);
    onClose();
  }, [ onClose ]);

  useEffect(() => {
    setOpen(show);
  }, [ show ]);

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth={size}
      fullWidth
      id={id}
    >
      <DialogTitle disableTypography className={classes.root} onClose={handleClose} id="closeIcon">
        <Grid container direction='row'>
          <Typography className={classes.heading}>{title}</Typography>
        </Grid>
      </DialogTitle>
      <DialogContent className={clsx(classes.dialogContentRunWorkLoad, classes.dialogWorkLoad)}>
        {message}
      </DialogContent>
      <DialogActions className={clsx(classes.dialogContentRunWorkLoad, classes.footerBackground)}>
        {buttons && buttons.map(each => (
          <Button disabled={each.disable} id={`__${each.label.toLowerCase().split(' ').join('-')}`} key={each.label} onClick={each.action} variant="text" color={each.type} className={each.type === "primary" ? classes.primaryButtonSubmit : classes.secondaryButtonCancel}>
            {each.label}
          </Button>
        ))}
      </DialogActions>
    </Dialog>
  );
};

Prompt.propTypes = {
  theme: PropTypes.objectOf(PropTypes.any).isRequired,                  // theme context, to be provided from the <App /> component
  size: PropTypes.oneOf([ 'sm', 'md', 'lg' ]),
  title: PropTypes.oneOfType([ PropTypes.string, PropTypes.node ]),
  message: PropTypes.oneOfType([ PropTypes.string, PropTypes.node ]),
  show: PropTypes.bool,
  onClose: PropTypes.func,
  buttons: PropTypes.arrayOf(PropTypes.object, PropTypes.objectOf([ 'label', 'action', 'disable', 'type' ])),
  id: PropTypes.string,
};

Prompt.defaultProps = {
  size: 'sm',
  title: '',
  message: '',
  show: false,
  onClose: () => null,
  buttons: [],
  id: '',
};

export default withTheme(Prompt);