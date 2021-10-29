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
    border: '#D5DFE9 solid 1px',
  },
  listItemChecked: {
    margin: '10px 0',
    border: '#F8FAFB solid 1px',
    backgroundColor: '#F8FAFB'
  },
  innterListItem: {
    padding: '15px !important'
  },
  item: {
    fontWeight: 'bold',
    fontSize: '17px',
  },
  description: {
    color: 'grey',
    fontWeight: 600,
    paddingTop: '2px'
  },
  itemPurchased: {
    fontWeight: 'bold',
    fontSize: '17px',
    textDecoration: 'line-through',
    color: theme.palette.primary.main
  },
  descPurchased: {
    textDecoration: 'line-through',
    fontWeight: 600,
    color: 'grey',
    paddingTop: '2px'
  },
  checkBox: {
      '&checked': {
        color: '#3D70B2 !important',
      }
  },
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

    setChecked((pastChecked) => {
      const currentIndex = pastChecked.indexOf(value);
      const newChecked = [...pastChecked];
  
      if (currentIndex === -1) {
        newChecked.push(value);
      } else {
        newChecked.splice(currentIndex, 1);
      }

      return newChecked;
    });
  };

  console.log('checked checked', checked[1]);

  const { itemName, description, _id, purchased } = item;

    const labelId = `checkbox-list-label-${item}`;
          return (
            <>
            <ListItem
              className={checked[1] ? classes.listItemChecked : classes.listItem}
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
                    sx={{
                      color: '#C6C6C6',
                      '&.Mui-checked': {
                        color: '#4C81B7',
                      },
                    }}
                    className={classes.checkBox}
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
