
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { withTheme } from 'styled-components';
import { Button, Divider, Grid, Typography, FormControlLabel, Checkbox, IconButton } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import { Edit, Delete } from '@material-ui/icons';

import { Prompt } from '../../components/MessagePrompt';
import { TextInput } from '../../components/FormInput';
import StyledCard from '../../components/Card';
import useStyles from './style';

const data = [
  {
    id: 1,
    is_done: false,
    title: "Meeting at 8pm tonight"
  },
  {
    id: 2,
    is_done: true,
    title: "catchup call with team 8"
  },
  {
    id: 3,
    is_done: false,
    title: "catchup call with team 5"
  },
  {
    id: 4,
    is_done: false,
    title: "dinner with PM"
  }      
];

const Task = props => {
  const { theme } = props;
  const [ taskList, setTaskList ] = useState(data);
  const [ showAddTask, setShowAddTask ] = useState(false);
  const [ newTaskName, setNewTaskName ] = useState('');

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

  return (
    <Grid container justify="center">
      <Grid item sm={12} md={6}>
        <Grid container>
          <Grid item xs={12}>
            <Grid container justify="space-between" alignItems="center">
              <Grid item>
                <Typography className={classes.header}>{"{BucketName}: task list"}</Typography>
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

      </Grid>
    </Grid>
  );
};

Task.propTypes = {
  theme: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default withTheme(Task);