import React, { useEffect, useState, Dispatch } from 'react';
import axios from 'axios';
import NavBar from '../components/NavBar/NavBar';
import { IAction, SetShoppingList } from "../actions";
import { IAppState } from '../store';
import { connect } from "react-redux";
import ListBody from '../components/ShoppingListBody/ListBody';
import { LoadingIcon } from '../components/Loading/LoadingIcon';
import { LoadingStatus } from '../constants/loading-status';
import { debug } from 'console';
import HomePageLayout from '../components/Layouts/HomePageLayout';

interface IProps {
    setShoppingList(x): any;
    shoppingList: any;
  }

const Main: React.FunctionComponent<IProps> = ({ setShoppingList }) => {

const [loading, setLoading] = useState<LoadingStatus>(LoadingStatus.LOADING);

  useEffect(() => {
    // Test Will Delete Later
    axios.get('/items').then((i) => {
        try {
            setShoppingList(i?.data);
            setLoading(LoadingStatus.SUCCESS);
        } catch (err) {
            setLoading(LoadingStatus.ERROR);
        }
    })
  }, []);

  const { LOADING, SUCCESS, ERROR } = LoadingStatus;

  return (
    <>
      <NavBar/>
      { loading === LOADING ?
        <HomePageLayout
          childComp={<LoadingIcon/>}
        />
        : 
        <>
            { loading === SUCCESS ?
            <ListBody/>
            : 
            <div>Error Fetching</div>}
        </>
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

export default connect(mapStateToProps, mapDispatchToProps)(Main);

