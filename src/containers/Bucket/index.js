import React, { useState, useEffect, useContext, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Grid, Typography, Button, Divider, CircularProgress } from '@material-ui/core';
import { withTheme } from 'styled-components';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';

import { Prompt } from "../../components/MessagePrompt";
import { TextInput } from "../../components/FormInput";
import StyledCard from '../../components/Card';
import { MessageContext } from '../../context/MessageContext';
import { bucketsFetchData, createBucketAction } from './actions';
import useStyles from "./style";

const Bucket = props => {
  const { theme, buckets, hasErrored, isLoading, fetchData, createBucket  } = props;
  const [ showAddBucket, setShowAddBucket ] = useState(false);
  const [ newBucketName, setNewBucketName ] = useState('');

  const classes = useStyles(theme)();
  const { showAlert } = useContext(MessageContext);

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

  const handleCreateBucketSubmit = useCallback(() => {
    if (newBucketName) {
      const data = { name: newBucketName };
      createBucket(data)
        .then(response => {
          showAlert('success', response.msg);
          fetchData();
          hideBucketDialog();
        });
    }else {
      showAlert('error', "Bucket name is not valid.");
    }
  }, [ createBucket, newBucketName ]);

  useEffect(() => {
    fetchData();
  }, [ fetchData ]);

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
                { label: 'Submit', action: handleCreateBucketSubmit, type: "primary", disable: false } 
              ]} 
            />
          </Grid>
        </Grid>
        <Divider className={classes.divider}  />
      </Grid>
      <Grid item xs={12}>
        <Grid container justify="flex-start" alignItems="center" spacing={2}>
          {hasErrored && (
            <Typography className={classes.body}>
            Sorry! There was an error loading the bucket list.
            </Typography>
          )}
          {isLoading && (
            <Grid item xs={12}>
              <Grid container justify="center">
                <CircularProgress />
              </Grid>
            </Grid>
          )}
          {buckets.length 
            ? buckets.map((each,idx) => (
              <Grid item key={`bucket-item-${idx.toString()}`}  xs={12} sm={9} md={6} lg={4}>
                <Link to={`/bucket/${each.id}/tasks`} style={{ textDecoration: 'none' }}>
                  <StyledCard>
                    <Typography className={classes.label}>{each.name}</Typography>
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

Bucket.propTypes = {
  theme: PropTypes.objectOf(PropTypes.any).isRequired,
  buckets: PropTypes.arrayOf(PropTypes.object),
  hasErrored: PropTypes.bool, 
  isLoading: PropTypes.bool, 
  fetchData: PropTypes.func,
  createBucket: PropTypes.func
};

Bucket.defaultProps = {
  buckets: [],
  hasErrored: false,
  isLoading: false,
  fetchData: () => null,
  createBucket: () => null
};

const mapStateToProps = state => {
  return {
    buckets: state.buckets,
    hasErrored: state.bucketsHasErrored,
    isLoading: state.bucketsIsLoading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchData: () => dispatch(bucketsFetchData()),
    createBucket: data => dispatch(createBucketAction(data))
  };
};
export default compose(connect(mapStateToProps, mapDispatchToProps))(withTheme(Bucket));