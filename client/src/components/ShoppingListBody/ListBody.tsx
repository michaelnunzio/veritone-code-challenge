import React, { Dispatch } from 'react';
import ShoppingList from './ShoppingList';
import EmptyList from './EmptyList';
import HomePageLayout from '../Layouts/HomePageLayout';
import { connect } from "react-redux";
import { IAction, SetShoppingList } from "../../actions";
import { IAppState } from '../../store';

interface IProps {
    setShoppingList(x): any;
    shoppingList: any;
  }

const ListBody: React.FunctionComponent<IProps> = ({ setShoppingList, shoppingList }) => {
  return (
    <>
    { shoppingList && shoppingList?.length >= 1 ?
        <ShoppingList/>
        : 
        <HomePageLayout
          childComp={<EmptyList/>}
        />
    }
    </>
  );
}

const mapStateToProps = (state: IAppState) => {
    return {
      shoppingList: state.app.shoppingList
    }
  }

const mapDispatchToProps = (dispatch: Dispatch<IAction>) => {
    return {
      setShoppingList: (x) => dispatch(SetShoppingList(x))
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(ListBody);

