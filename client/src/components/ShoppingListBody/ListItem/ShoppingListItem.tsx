import React, { Dispatch, useState }from 'react';
import { Grid, makeStyles, Button, Backdrop, Modal, Fade, Box } from '@material-ui/core';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ListItemModal from '../../Modal/ListItemModal'
import DeleteItemModal from '../../Modal/DeleteItemModal';
import { connect } from "react-redux";

const useStyles = makeStyles((theme) => ({
  listItem: {
    margin: '10px 0',
    border: 'lightgrey solid 1px'
  },
  innterListItem: {
    padding: '15px !important'
  }
  
}));

interface SLProps {
    item: ListType
}

type ListType = {
  itemName: string,
  description: string,
  itemAmount: number,
  purchased: boolean,
  _id: number
};

const ShoppingListItem: React.FunctionComponent<SLProps> = ({ item }) => {
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

    const labelId = `checkbox-list-label-${item}`;
          return (
            <>
            <ListItem
              className={classes.listItem}
              key={item._id}
              secondaryAction={
                <>
                <ListItemModal
                    item={item}
                    type={'edit'}
                />
                <DeleteItemModal
                    item={item}
                />
                </>
              }
              disablePadding
            >
              <ListItemButton role={undefined} onClick={()=> {''}} dense className={classes.innterListItem}>
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    checked={checked.indexOf(item._id) !== -1}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{ 'aria-labelledby': labelId }}
                    onClick={handleToggle(item._id)}
                  />
                </ListItemIcon>
                <Grid item>
                    <Grid item>{item?.itemName}</Grid>
                    <Grid item>{item?.description}</Grid>
                </Grid>
              </ListItemButton>
            </ListItem>
        </>
  );
}

export default ShoppingListItem;
