import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import DialogContentText from '@mui/material/DialogContentText';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { AMOUNT_DROP_DOWN } from '../../../utilities/const';
import { Grid } from '@material-ui/core';

export const ModalEditItems = (props) => {
    const { 
        item: 
        { itemName, itemAmount, description, _id, purchased}
     } = props;
    
     const [formState, setFormState] = React.useState({
        name: itemName,
        desc: description,
        amount: itemAmount
      });

      const handleFormChange = (evt) => {
        const value = evt.target.value;
        setFormState({
            ...formState,
            [evt.target.name]: value
        });
    }

    const { name, desc, amount} = formState;
    return (
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
            label="Select"
            onChange={handleFormChange} 
            value={amount}
            name="amount" 
            helperText="How many?"
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
    )
}

export const ModalAddItems = () => {
    return (
        <>
            <Typography>
                Add an item
            </Typography>
            <DialogContentText>
                To subscribe to this website, please enter your email address here. We
                will send updates occasionally.
            </DialogContentText>
            {/* <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Email Address"
                type="email"
                fullWidth
                variant="standard"
                /> */}
        </>
    )
}