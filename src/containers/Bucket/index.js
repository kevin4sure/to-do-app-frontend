import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Grid, Typography, Button, Divider } from '@material-ui/core';
import { withTheme } from 'styled-components';
import { Link } from 'react-router-dom';

import { Prompt } from "../../components/MessagePrompt";
import { TextInput } from "../../components/FormInput";
import StyledCard from '../../components/Card';
import useStyles from "./style";

const Task = props => {
  const { theme } = props;
  const [ bucketList ] = useState([ 1,2,3,4 ]);
  const [ showAddBucket, setShowAddBucket ] = useState(false);
  const [ newBucketName, setNewBucketName ] = useState('');

  const classes = useStyles(theme)();

  const showBucketDialog = () => {
    setNewBucketName('');
    setShowAddBucket(true);
  };

  const hideBucketDialog = () => {
    setShowAddBucket(false);
  };

  const handleBucketNameChange = value => {
    setNewBucketName(value);
  };

  return (
    <Grid container>
      <Grid item xs={12}>
        <Grid container justify="space-between" alignItems="center">
          <Grid item>
            <Typography className={classes.header}>Bucket List</Typography>
          </Grid>
          <Grid item>
            <Button onClick={showBucketDialog} className={classes.primaryButton}>add bucket</Button>
            <Prompt 
              show={showAddBucket} 
              size="sm" 
              onClose={hideBucketDialog}
              title="Create new bucket" 
              message={
                <TextInput 
                  name="bucket_name"
                  label="Bucket Name"
                  value={newBucketName}
                  onChange={handleBucketNameChange}
                />
              } 
              buttons={[ 
                { label: 'Cancel', action: hideBucketDialog, type: "secondary" }, 
                { label: 'Submit', action: hideBucketDialog, type: "primary", disable: false } 
              ]} 
            />
          </Grid>
        </Grid>
        <Divider className={classes.divider}  />
      </Grid>
      <Grid item xs={12}>
        <Grid container justify="flex-start" spacing={2}>
          {bucketList.length 
            ? bucketList.map(() => (
              <Grid item xs={12} sm={9} md={6} lg={4}>
                <Link to={`/bucket/${1}/tasks`} style={{ textDecoration: 'none' }}>
                  <StyledCard>
                    <Typography className={classes.label}>Personal</Typography>
                  </StyledCard>
                </Link>
              </Grid>
            )) : (
              <Grid item>
                <Typography className={classes.body}>
                  Sorry! there are no buckets to display, 
                  you can create new bucket from the above &quot;ADD BUCKET&quot; button
                </Typography>
              </Grid>
            )}
        </Grid>
      </Grid>
    </Grid>
  );
};

Task.propTypes = {
  theme: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default withTheme(Task);