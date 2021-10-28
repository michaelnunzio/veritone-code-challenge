import React from 'react';
import { Grid, makeStyles } from '@material-ui/core';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import Checkbox from '@mui/material/Checkbox';
import ListItemModal from '../../Modal/ListItemModal'
import DeleteItemModal from '../../Modal/DeleteItemModal';

const useStyles = makeStyles((theme) => ({
  listItem: {
    margin: '10px 0',
    border: 'lightgrey solid 1px',
  },
  innterListItem: {
    padding: '15px !important'
  },
  item: {
    fontWeight: 'bold',
    fontSize: '16px',
  },
  description: {
    color: 'grey'
  },
  itemPurchased: {
    fontWeight: 'bold',
    fontSize: '16px',
    textDecoration: 'line-through',
    color: theme.palette.primary.main
  },
  descPurchased: {
    textDecoration: 'line-through',
    color: 'grey'
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

  const { itemName, description, _id, purchased } = item;

    const labelId = `checkbox-list-label-${item}`;
          return (
            <>
            <ListItem
              className={classes.listItem}
              key={_id}
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
                    checked={checked.indexOf(_id) !== -1}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{ 'aria-labelledby': labelId }}
                    onClick={handleToggle(_id)}
                  />
                </ListItemIcon>
                <Grid item>
                    <Grid item className={purchased ? classes.itemPurchased : classes.item}>{itemName}</Grid>
                    <Grid item className={purchased ? classes.descPurchased : classes.description}>{description}</Grid>
                </Grid>
              </ListItemButton>
            </ListItem>
        </>
  );
}

export default ShoppingListItem;
