import React, { useState, Dispatch } from 'react';
import Typography from '@mui/material/Typography';
import DialogContentText from '@mui/material/DialogContentText';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { AMOUNT_DROP_DOWN } from '../../../utilities/const';
import { ModalLoading, ModalSuccess } from './ModalLoadingSuccess';
import { connect } from 'react-redux';
import { IAction, GetListData } from "../../../actions";
import { IAppState } from '../../../store';
import { ListItemData } from '../../../constants/item-data';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

interface IEditProps {
    setListItemData(x): any;
    componentProps: ListItemData,
    modalLoading: number
  }

interface IAddProps {
    setListItemData(x): any;
    modalLoading: number
  }

const ModalEditItems: React.FC<IEditProps> = ({ setListItemData, componentProps, modalLoading }) => {
    const { 
        itemName, itemAmount, description, _id, purchased
     } = componentProps;
    
     const [checked, setChecked] = React.useState(purchased);
     const [formState, setFormState] = React.useState({
        name: itemName,
        desc: description,
        amount: itemAmount,
        id: _id,
        purchasedState: checked
      });

      const handleToggle = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChecked(event.target.checked);
        setFormState({
            ...formState,
            ['purchasedState']: event.target.checked
        });
      };

      const handleFormChange = (evt) => {
        const value = evt.target.value;
        setFormState({
            ...formState,
            [evt.target.name]: value
        });
    }

    setListItemData(formState);

    const { name, desc, amount, purchasedState } = formState;
    return (
        <>
        {modalLoading === 0 ?
        <>
            <Typography>
                Edit an item
            </Typography>
            <DialogContentText>
                Edit your item below
            </DialogContentText>
            <TextField
                margin="dense"
                id="outlined-basic" 
                label="Item Name" 
                variant="outlined"
                value={name}
                name="name" 
                fullWidth
                onChange={handleFormChange} 
                />

            <TextField
                id="outlined-multiline-static"
                label="Description"
                multiline
                rows={4}
                value={desc}
                name="desc" 
                onChange={handleFormChange} 
                fullWidth
                margin="normal"
            />

            <TextField
            id="outlined-select-currency"
            select
            label="How many?"
            onChange={handleFormChange} 
            value={amount}
            name="amount" 
            fullWidth
            margin="dense"
            >
            {AMOUNT_DROP_DOWN.map((option) => (
                <MenuItem key={option} value={option}>
                {option}
                </MenuItem>
            ))}
            </TextField>
            <FormControlLabel 
            control={
            <Checkbox
                checked={checked}
                onChange={handleToggle}
                inputProps={{ 'aria-label': 'controlled' }}
            />
            } label="Purchased" 
            />
        </>
        :
        <>
            { modalLoading === 1 ?
            <ModalLoading/> 
            : <ModalSuccess
                type={'Updated'}
            />}
        </> }
        </>
    )
}

const ModalAddItems: React.FC<IAddProps> = ({ setListItemData, modalLoading }) => {

    const [formState, setFormState] = React.useState({
        name: '',
        desc: '',
        amount: '',
        id: '',
        purchasedState: ''
      });

      const handleFormChange = (evt) => {
        const value = evt.target.value;
        setFormState({
            ...formState,
            [evt.target.name]: value
        });
    }

    setListItemData(formState);

    const { name, desc, amount, purchasedState } = formState;
    return (
        <>
        {modalLoading === 0 ?
        <>
            <Typography>
                Add an item
            </Typography>
            <DialogContentText>
                Add your new item below
            </DialogContentText>
            <TextField
                margin="dense"
                id="outlined-basic" 
                label="Item Name" 
                variant="outlined"
                value={name}
                name="name" 
                fullWidth
                onChange={handleFormChange} 
                />

            <TextField
                id="outlined-multiline-static"
                label="Description"
                multiline
                rows={4}
                value={desc}
                name="desc" 
                onChange={handleFormChange} 
                fullWidth
                margin="normal"
            />

            <TextField
            id="outlined-select-currency"
            select
            label="How many?"
            onChange={handleFormChange} 
            value={amount}
            name="amount" 
            fullWidth
            margin="dense"
            >
            {AMOUNT_DROP_DOWN.map((option) => (
                <MenuItem key={option} value={option}>
                {option}
                </MenuItem>
            ))}
            </TextField>
        </>
        : 
        
        <>
        { modalLoading === 1 ?
        <ModalLoading/> 
        : <ModalSuccess
            type={'Added'}
        />}
        </> }

        </>
    )
}

const mapStateToProps = (state: IAppState) => {
    return {
        modalLoading: state.app.modalLoading
    }
  }

const mapDispatchToProps = (dispatch: Dispatch<IAction>) => {
    return {
      setListItemData: (x) => dispatch(GetListData(x))
    }
  }

export default {
    ModalEditItems: connect(mapStateToProps,mapDispatchToProps)(ModalEditItems),
    ModalAddItems: connect(mapStateToProps,mapDispatchToProps)(ModalAddItems)
}