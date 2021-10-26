import Component from './App';
import { compose } from "redux";
import { connect } from 'react-redux';
import { Dispatch } from 'react';
import { SetAction, IAction } from './actions';
import { IAppState } from './store';

const mapStateToProps = ( state: IAppState ) => {
    return {
        shoppingList: state.app.shoppingList
    }
}

const mapDispatchToProps = (dispatch: Dispatch<IAction>) => {
    return {
        onClick: () => dispatch(SetAction(''))
    }
}

export const App = compose(
    connect(
        mapStateToProps, 
        mapDispatchToProps
        )
    )(Component);