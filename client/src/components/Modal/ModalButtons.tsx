import React, { useState, Dispatch } from 'react';
import { Button } from '@material-ui/core';
import axios from 'axios';

import { connect } from 'react-redux';
import { IAction, GetListData, SetShoppingList, SetLoadingState} from "../../actions";
import { IAppState } from '../../store';
import { ListItemDataForm } from '../../constants/item-data';

interface SLProps {
    setShoppingList(x): any;
    setLoadingState(x): any;
    listData?: ListItemDataForm;
}

interface DeleteItemProps {
    setShoppingList(x): any;
    id: number;
}

const ModalAddButton: React.FC<SLProps> = ({setShoppingList, setLoadingState, listData}) => {

    const addNewItem = async (listData) => {
        setLoadingState(1);
        const { name, amount, desc } = listData
       await axios.post(`/createItem`,
        {
            "itemName": name,
            "description": desc,
            "purchased": false,
            "itemAmount": amount
        }
        ).then( (x) => {
            axios.get('/items').then((items) => {
                setShoppingList(items?.data);
                setLoadingState(2);
            })
        });
    }

    return (
        <>
            <Button onClick={()=> addNewItem(listData)}>
                New Item
            </Button>
        </>
    )
}

const ModalUpdateButton: React.FC<SLProps> = ({setShoppingList, setLoadingState, listData}) => {

    const updateItem = async (listData) => {
        setLoadingState(1);
        const { name, amount, desc, purchasedState } = listData
       await axios.patch(`/updateItem/${listData?.id}`,
        {
            "itemName": name,
            "description": desc,
            "purchased": purchasedState,
            "itemAmount": amount
        }
        ).then( (x) => {
            axios.get('/items').then((items) => {
                setShoppingList(items?.data);
                setLoadingState(2);
            })
        });
    }

    return (
        <>
            <Button onClick={()=> updateItem(listData)}>
                Save Item
            </Button>
        </>
    )
}

const ModalDeleteButton: React.FC<DeleteItemProps> = ({setShoppingList, id}) => {

    const deleteItem = async (id) => {
        await axios.delete(`/deleteItem/${id}`).then((x) => {
            axios.get('/items').then((items) => {
                setShoppingList(items?.data);
            })
        })
    }

    return (
        <>
            <Button onClick={()=> deleteItem(id)}>
                Delete
            </Button>
        </>
    )
}

const mapStateToProps = (state: IAppState) => {
    return {
      listData: state.app.listData
    }
  }

const mapDispatchToProps = (dispatch: Dispatch<IAction>) => {
    return {
      setShoppingList: (x) => dispatch(SetShoppingList(x)),
      setListItemData: (x) => dispatch(GetListData(x)),
      setLoadingState: (x) => dispatch(SetLoadingState(x))
    }
  }


export default {
    ModalAddButton: connect(mapStateToProps,mapDispatchToProps)(ModalAddButton),
    ModalUpdateButton: connect(mapStateToProps,mapDispatchToProps)(ModalUpdateButton),
    ModalDeleteButton: connect(mapStateToProps,mapDispatchToProps)(ModalDeleteButton)
}