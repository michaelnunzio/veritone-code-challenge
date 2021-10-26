import React, { useState }from 'react';
import { Grid, makeStyles, Button } from '@material-ui/core';

import FullList from './ListItem/List';
const useStyles = makeStyles((theme) => ({
  container: {
    margin: 'auto',
    // backgroundColor: 'pink',
    padding: '35px',
    maxWidth:'80vw'
    // justifyContent: 'center',
  },
  justifyHeader: {
    textAlign: 'left'
  },
  justifyBtn: {
    textAlign: 'right'
  },
}));

const ShoppingList = () => {
  const classes = useStyles();

  const [checked, setChecked] = React.useState([0]);

  const handleToggle = (value: number) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

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
      <Button>Add Item</Button>
    </Grid>

    <FullList/> 

    </Grid>

  );
}

export default ShoppingList;
