
import React, { useState, useEffect, useCallback, useContext } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { withTheme } from 'styled-components';
import { Button, Divider, Grid, Typography, FormControlLabel, Checkbox, IconButton, CircularProgress, TextField } from '@material-ui/core';
import { Edit, Delete, SentimentVeryDissatisfied } from '@material-ui/icons';
import { green } from '@material-ui/core/colors';
import { Autocomplete } from '@material-ui/lab';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';

import { bucketDetailFetchData, bucketsFetchData } from "../Bucket/actions";
import { tasksUnderBucketFetchData, createTaskAction, updateTaskStatus, deleteTaskAction } from './actions';
import { MessageContext } from '../../context/MessageContext';
import { Prompt } from '../../components/MessagePrompt';
import StyledCard from '../../components/Card';
import useStyles from './style';

const Task = props => {
  const { theme, match, selectedBucket, getBucketDetail, tasksUnderBucket, getTasksUnderBucket, allBuckets, getAllBuckets, createTask, updateTask, deleteTask } = props;
  const [ taskList, setTaskList ] = useState([]);
  const [ showAddTask, setShowAddTask ] = useState(false);
  const [ newTaskName, setNewTaskName ] = useState('');
  const [ bucket, setBucket ] = useState(null);
  const [ taskActionType, setTaskActionType ] = useState('');
  const [ selectedTask, setSelectedTask ] = useState(null);
  const [ deleteTaskDialog, setDeleteTaskDialog ] = useState(false);

  const { params } = match;
  const classes = useStyles(theme)();
  const { showAlert } = useContext(MessageContext);

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
    setTaskActionType('create');
    if (!allBuckets.length) {
      getAllBuckets();
    }
    setNewTaskName('');
    setBucket(null);
    setShowAddTask(true);
  };

  const showEditTaskDialog = () => {
    setTaskActionType('edit');
    if (!allBuckets.length) {
      getAllBuckets();
    }
    setShowAddTask(true);
  };

  const hideTaskDialog = () => {
    setShowAddTask(false);
    setSelectedTask(null);
  };

  const showDeleteTaskDialog = () => {
    setDeleteTaskDialog(true);
  };

  const hideDeleteTaskDialog = () => {
    setDeleteTaskDialog(false);
    setSelectedTask(null);
  };

  const handleTaskNameChange = value => {
    setNewTaskName(value);
  };

  const handleTaskStatusChange = useCallback(e => {
    const taskId = parseInt(e.currentTarget.name.substring(5), 10);
    const value = e.currentTarget.checked;
    updateTask(taskId, { is_done: value || false })
      .then(response => {
        showAlert('success', response.msg);
      })
      .then(() => {
        const tmp = taskList.map(each => {
          if (each.id === taskId) {
            return { ...each, is_done: value || false }; 
          }
          return each;
        });
        setTaskList(tmp);
      })
      .catch(error => {
        Object.values(error.response.data.error).forEach(each => {
          showAlert('error', each.join(' '));
        });        
      });
  },[ taskList, updateTask, showAlert ]);

  const handleNewTaskSubmit = useCallback(() => {
    createTask({ bucket_id: bucket.id, title: newTaskName })
      .then(res => {
        showAlert('success', res.msg);
        hideTaskDialog();
        getTasksUnderBucket(params.bucketId);
      })
      .catch(error => {
        Object.values(error.response.data.error).forEach(each => {
          showAlert('error', each.join(' '));
        });        
      });

  }, [ createTask, bucket, newTaskName, showAlert, getTasksUnderBucket, params ]);

  const handleEditTaskSubmit = useCallback(() => {
    const data = { bucket_id: bucket.id, title: newTaskName };
    updateTask(selectedTask.id, data)
      .then(res => {
        showAlert("success", res.msg);
        hideTaskDialog();
        getTasksUnderBucket(params.bucketId);
      })
      .catch(error => {
        Object.values(error.response.data.error).forEach(each => {
          showAlert('error', each.join(' '));
        }); 
      });
  }, [ updateTask ,selectedTask, bucket, newTaskName, showAlert, getTasksUnderBucket, params ]);

  const handleEditTaskClick = task => {
    showEditTaskDialog();
    setSelectedTask(task);
    setBucket(task.bucket);
    setNewTaskName(task.title);
  };

  const switchTaskDialog = () => {
    const type = taskActionType;
    if (type === "edit") {
      handleEditTaskSubmit();
    } else if ( type === 'create') {
      handleNewTaskSubmit();
    }
  };

  const handleDeleteTaskClick = task => {
    setSelectedTask(task);
    showDeleteTaskDialog();
  };

  const deleteTaskSubmit = useCallback(() => {
    if (selectedTask?.id) {
      deleteTask(selectedTask.id)
        .then(res => {
          showAlert("success", res.msg);
          hideDeleteTaskDialog();
          getTasksUnderBucket(params.bucketId);
        })
        .catch(error => {
          Object.values(error.response.data.error).forEach(each => {
            showAlert('error', each.join(' '));
          }); 
        });
    } else {
      showAlert("error", 'no task selected');
    }
  }, [ selectedTask, deleteTask, showAlert, getTasksUnderBucket, params ]);

  useEffect(() => {
    getBucketDetail(params.bucketId);
    getTasksUnderBucket(params.bucketId);
  }, [ getBucketDetail, getTasksUnderBucket, params ]);

  useEffect(() => {
    if (tasksUnderBucket?.data) {
      setTaskList(tasksUnderBucket.data);
    }
  }, [ tasksUnderBucket ]);

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
                    title={taskActionType === "create" ? "Add New Task": "Edit Existing Task"} 
                    message={
                      <Grid container justify="center" spacing={2}>
                        <Grid item><Autocomplete
                          options={allBuckets}
                          value={bucket}
                          getOptionSelected={option => option.name}
                          onChange={(e, newValue) => setBucket(newValue)}
                          renderOption={option => option.name}
                          getOptionLabel={option => option.name}
                          style={{ width: 200 }}
                          renderInput={txtProps => <TextField {...txtProps} value={bucket?.name} name="bucket_name" label="Bucket Name" variant="outlined" />}
                        /></Grid>
                        <Grid item><TextField 
                          name="task_name"
                          label="Task Name"
                          value={newTaskName}
                          onChange={e => handleTaskNameChange(e.target.value)}
                          variant="outlined"
                        /></Grid>

                      </Grid>
                    } 
                    buttons={[ 
                      { label: 'Cancel', action: hideTaskDialog, type: "secondary" }, 
                      { label: 'Submit', action: switchTaskDialog, type: "primary", disable: false } 
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
                                <IconButton onClick={() => handleEditTaskClick(each)} className={classes.label}>
                                  <Edit className={classes.label}/>
                                </IconButton>
                              </Grid>
                              <Grid item>
                                <IconButton onClick={() => handleDeleteTaskClick(each)} className={classes.danger}>
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
      {/* task delete modal */}
      <Prompt 
        show={deleteTaskDialog} 
        size="sm" 
        onClose={hideDeleteTaskDialog}
        title="Confirm Task Delete"
        message="Are you sure you want to delete this task?"
        buttons={[ 
          { label: 'Cancel', action: hideDeleteTaskDialog, type: "secondary" }, 
          { label: 'Confirm', action: deleteTaskSubmit, type: "primary", disable: false } 
        ]} 
      />
    </Grid>
  );
};

Task.propTypes = {
  theme: PropTypes.objectOf(PropTypes.any).isRequired,
  match: PropTypes.objectOf(PropTypes.any).isRequired,
  getBucketDetail: PropTypes.func,
  selectedBucket: PropTypes.objectOf(PropTypes.any),
  getTasksUnderBucket: PropTypes.func,
  tasksUnderBucket: PropTypes.objectOf(PropTypes.any),
  allBuckets: PropTypes.arrayOf(PropTypes.object),
  getAllBuckets: PropTypes.func,
  createTask: PropTypes.func,
  updateTask: PropTypes.func,
  deleteTask: PropTypes.func,
};

Task.defaultProps = {
  selectedBucket:  null,
  getBucketDetail: () => null,
  tasksUnderBucket: null,
  getTasksUnderBucket: () => null,
  allBuckets: [],
  getAllBuckets: () => null,
  createTask: () => null,
  updateTask: () => null,
  deleteTask: () => null,
};

const mapStateToProps = state => {
  return {
    selectedBucket: state.selectedBucket,
    tasksUnderBucket: state.tasksUnderBucket,
    allBuckets: state.buckets
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getBucketDetail: id => dispatch(bucketDetailFetchData(id)),
    getTasksUnderBucket: id => dispatch(tasksUnderBucketFetchData(id)),
    getAllBuckets: () => dispatch(bucketsFetchData()),
    createTask: data => dispatch(createTaskAction(data)),
    updateTask: (id, data) => dispatch(updateTaskStatus(id, data)),
    deleteTask: id => dispatch(deleteTaskAction(id)),
  };
};

export default compose(connect(mapStateToProps, mapDispatchToProps))(withTheme(withRouter(Task)));