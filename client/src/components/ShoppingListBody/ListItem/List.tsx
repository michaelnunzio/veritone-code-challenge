import React, { Dispatch, useState }from 'react';
import { Grid, makeStyles, Button} from '@material-ui/core';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import CommentIcon from '@mui/icons-material/Comment';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

import { connect } from "react-redux";
import { IAction, SetShoppingList } from "../../../actions";
import { IAppState } from '../../../store';

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
    setShoppingList(x): any;
    shoppingListItems: Array<ListType>
}

type ListType = {
  itemName: string,
  description: string,
  itemAmount: number,
  purchased: boolean,
  _id: number
};

const FullList: React.FunctionComponent<SLProps> = ({ setShoppingList, shoppingListItems }) => {
  console.log('Test Shopping List items passed', shoppingListItems);
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
    <List sx={{ width: '100%',}}>
        {shoppingListItems.map((item) => {
          const labelId = `checkbox-list-label-${item}`;
          return (
            <ListItem
              className={classes.listItem}
              key={item._id}
              secondaryAction={
                <>
                <IconButton edge="end" aria-label="comments">
                  <EditIcon />
                </IconButton>
                <IconButton edge="end" aria-label="comments">
                <DeleteOutlineIcon />
                </IconButton>
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
          );
        })}
    </List>
  );
}

const mapStateToProps = (state: IAppState) => {
    return {
      shoppingListItems: state.app.shoppingList
    }
  }
  const mapDispatchToProps = (dispatch: Dispatch<IAction>) => {
    return {
      setShoppingList: (x) => dispatch(SetShoppingList(x))
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(FullList);
