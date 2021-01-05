
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { withTheme } from 'styled-components';
import { Button, Divider, Grid, Typography, FormControlLabel, Checkbox, IconButton, CircularProgress } from '@material-ui/core';
import { Edit, Delete, SentimentVeryDissatisfied } from '@material-ui/icons';
import { green } from '@material-ui/core/colors';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';

import { bucketDetailFetchData } from "../Bucket/actions";
import { tasksUnderBucketFetchData } from './actions';
import { Prompt } from '../../components/MessagePrompt';
import { TextInput } from '../../components/FormInput';
import StyledCard from '../../components/Card';
import useStyles from './style';

const Task = props => {
  const { theme, match, selectedBucket, getBucketDetail, tasksUnderBucket, getTasksUnderBucket } = props;
  const [ taskList, setTaskList ] = useState([]);
  const [ showAddTask, setShowAddTask ] = useState(false);
  const [ newTaskName, setNewTaskName ] = useState('');
  
  const { params } = match;
  const classes = useStyles(theme)();

  const GreenCheckbox = withStyles({
    root: {
      color: green[400],
      '&$checked': {
        color: green[600],
      },
    },
    checked: {},
  })(checkboxProps => <Checkbox color="default" {...checkboxProps} />);

  const showTaskDialog = () => {
    setNewTaskName('');
    setShowAddTask(true);
  };

  const hideTaskDialog = () => {
    setShowAddTask(false);
  };

  const handleTaskNameChange = value => {
    setNewTaskName(value);
  };

  const handleTaskStatusChange = e => {
    const taskId = parseInt(e.currentTarget.name.substring(5), 10);
    const tmp = taskList.map(each => {
      if (each.id === taskId) {
        return { ...each, is_done: e.currentTarget.checked }; 
      }
      return each;
    });
    setTaskList(tmp);
  };

  useEffect(() => {
    getBucketDetail(params.bucketId);
    getTasksUnderBucket(params.bucketId);
  }, [ getBucketDetail, getTasksUnderBucket, params ]);

  useEffect(() => {
    if (tasksUnderBucket?.data) {
      setTaskList(tasksUnderBucket.data);
    }
  }, [ tasksUnderBucket ]);

  if (!selectedBucket) {
    return null;
  }

  return (
    <Grid container justify="center">
      <Grid item sm={12} md={6}>
        {selectedBucket?.error && (
          <Grid container justify="center" alignItems="center">
            <SentimentVeryDissatisfied className={classes.body} />
            <Typography className={classes.body}>{selectedBucket?.error}</Typography>
          </Grid>
        )}
        {selectedBucket?.loading && (
          <Grid container justify="center" alignItems="center">
            <CircularProgress />
          </Grid>
        )}
        {selectedBucket?.data && (
          <Grid container>
            <Grid item xs={12}>
              <Grid container justify="space-between" alignItems="center">
                <Grid item>
                  <Typography className={classes.header}>{selectedBucket?.data && `${selectedBucket?.data?.name || ""} : Task List`}</Typography>
                </Grid>
                <Grid item>
                  <Button onClick={showTaskDialog} className={classes.primaryButton}>add task</Button>
                  <Prompt 
                    show={showAddTask} 
                    size="sm" 
                    onClose={hideTaskDialog}
                    title="Add new task" 
                    message={
                      <TextInput 
                        name="task_name"
                        label="Task Name"
                        value={newTaskName}
                        onChange={handleTaskNameChange}
                      />
                    } 
                    buttons={[ 
                      { label: 'Cancel', action: hideTaskDialog, type: "secondary" }, 
                      { label: 'Submit', action: hideTaskDialog, type: "primary", disable: false } 
                    ]} 
                  />
                </Grid>
              </Grid>
              <Divider className={classes.divider}  />
            </Grid>
            <Grid item xs={12}>
              <Grid container justify="flex-start" alignItems="flex-start" spacing={2}>
                {tasksUnderBucket?.loading && (
                  <Grid container justify="center" alignItems="center">
                    <CircularProgress />
                  </Grid>
                )}
                {taskList.length 
                  ? taskList.map(each => (
                    <Grid key={`task-list-${each.id}`} item xs={12}>
                      <StyledCard>
                        <Grid container justify="space-between">
                          <Grid item>
                            <FormControlLabel
                              control={<GreenCheckbox checked={each.is_done} onChange={handleTaskStatusChange} name={`task-${each.id}`} />}
                              label={<Typography className={clsx(classes.label, { [classes.strike]: each.is_done })}>{each.title}</Typography>}
                            />
                          </Grid>
                          <Grid item>
                            <Grid container>
                              <Grid item>
                                <IconButton className={classes.label}>
                                  <Edit className={classes.label}/>
                                </IconButton>
                              </Grid>
                              <Grid item>
                                <IconButton className={classes.danger}>
                                  <Delete className={classes.danger}/>
                                </IconButton>
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                      
                      </StyledCard>
                    </Grid>
                  )) : (
                    <Grid item>
                      <Typography className={classes.body}>
                        Sorry! there are no tasks to display, 
                        you can add new task from the above &quot;ADD TASK&quot; button
                      </Typography>
                    </Grid>
                  )}
              </Grid>
            </Grid>
          </Grid>
        )}
      </Grid>
    </Grid>
  );
};

Task.propTypes = {
  theme: PropTypes.objectOf(PropTypes.any).isRequired,
  match: PropTypes.objectOf(PropTypes.any).isRequired,
  getBucketDetail: PropTypes.func,
  selectedBucket: PropTypes.objectOf(PropTypes.any),
  getTasksUnderBucket: PropTypes.func,
  tasksUnderBucket: PropTypes.objectOf(PropTypes.any)
};

Task.defaultProps = {
  selectedBucket:  null,
  getBucketDetail: () => null,
  tasksUnderBucket: null,
  getTasksUnderBucket: () => null
};

const mapStateToProps = state => {
  return {
    selectedBucket: state.selectedBucket,
    tasksUnderBucket: state.tasksUnderBucket
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getBucketDetail: id => dispatch(bucketDetailFetchData(id)),
    getTasksUnderBucket: id => dispatch(tasksUnderBucketFetchData(id))
  };
};

export default compose(connect(mapStateToProps, mapDispatchToProps))(withTheme(withRouter(Task)));