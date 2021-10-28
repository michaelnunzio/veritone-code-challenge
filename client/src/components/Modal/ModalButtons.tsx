import React, { useState, Dispatch } from 'react';
import { Button, makeStyles } from '@material-ui/core';
import axios from 'axios';
import { connect } from 'react-redux';
import { IAction, GetListData, SetShoppingList, SetLoadingState} from "../../actions";
import { IAppState } from '../../store';
import { ListItemDataForm } from '../../constants/item-data';

const useStyles = makeStyles((theme) => ({
    addBtn: {
        backgroundColor: theme.palette.primary.main,
        color: '#fff',
        textTransform: 'none',
        margin: '10px 0',
        padding: '6px 17px',
        fontSize: '16px',
        fontWeight: 600,
        "&:hover": {
            backgroundColor: '#3C6792 !important'
          },
      },
  }));
  

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
  const classes = useStyles();
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
                if(items?.data?.length === 1) {
                    setLoadingState(0);
                }
            })
        });
    }

    return (
        <>
            <Button className={classes.addBtn} onClick={()=> addNewItem(listData)}>
                Add Item
            </Button>
        </>
    )
}

const ModalUpdateButton: React.FC<SLProps> = ({setShoppingList, setLoadingState, listData}) => {
    const classes = useStyles();
    const updateItem = (listData) => {
        setLoadingState(1);
        const { name, amount, desc } = listData
        axios.patch(`/updateItem/${listData?.id}`,
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
            <Button className={classes.addBtn} onClick={()=> updateItem(listData)}>
                Save Item
            </Button>
        </>
    )
}

const ModalDeleteButton: React.FC<DeleteItemProps> = ({setShoppingList, id}) => {
    const classes = useStyles();
    const deleteItem = async (id) => {
        await axios.delete(`/deleteItem/${id}`).then((x) => {
            axios.get('/items').then((items) => {
                setShoppingList(items?.data);
            })
        })
    }

    return (
        <>
            <Button className={classes.addBtn} onClick={()=> deleteItem(id)}>
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