import React, { Dispatch, useState }from 'react';
import List from '@mui/material/List';
import { connect } from "react-redux";
import { IAction, SetShoppingList } from "../../../actions";
import { IAppState } from '../../../store';

import ShoppingListItem from './ShoppingListItem';

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

  return (
    <List sx={{ width: '100%',}}>
        {shoppingListItems.map((item) => {
          const labelId = `checkbox-list-label-${item}`;
          return (
              <ShoppingListItem
                item={item}
              />
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
