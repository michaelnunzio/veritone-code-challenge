import React from 'react';
import { Grid, makeStyles, Button } from '@material-ui/core';
import ListItemModal from '../Modal/ListItemModal';

const useStyles = makeStyles((theme) => ({
  emptyList: {
    border: `${'solid 1px lightgrey'}`,
    borderRadius: '5px',
    padding: '12vh 12vw'
  }
}));

const EmptyList = () => {
  const classes = useStyles();
  return (
      <Grid item className={classes.emptyList}>
        Your Shopping List is Empty :(
          <Grid item>
            <ListItemModal
              type={'addNew'}
            />
          </Grid>
      </Grid>
  );
}

export default EmptyList;
