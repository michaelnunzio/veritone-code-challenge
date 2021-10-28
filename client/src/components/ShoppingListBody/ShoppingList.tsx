import React from 'react';
import { Grid, makeStyles } from '@material-ui/core';
import ListItemModal from '../Modal/ListItemModal';
import FullList from './ListItem/List';

const useStyles = makeStyles((theme) => ({
  container: {
    margin: 'auto',
    padding: '35px',
    maxWidth:'80vw'
    // justifyContent: 'center',
  },
  justifyHeader: {
    textAlign: 'left',
    fontSize: '16px',
    fontWeight: 'bold'
  },
  justifyBtn: {
    textAlign: 'right'
  },
}));

const ShoppingList = () => {
  const classes = useStyles();
  return (
    <Grid 
      container
      justifyContent="space-between"
      alignItems="center"
      spacing={1}
      className={classes.container}
    >
    <Grid item xs={6} className={classes.justifyHeader}>
      Your Items
    </Grid>
    <Grid item xs={6} className={classes.justifyBtn}>
      {/* <Button>Add Item</Button> */}
      <ListItemModal
          type={'addItem'}
      />
    </Grid>

    <FullList/> 

    </Grid>

  );
}

export default ShoppingList;
