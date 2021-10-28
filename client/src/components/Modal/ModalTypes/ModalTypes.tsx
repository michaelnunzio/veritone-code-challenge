import React, { useState, Dispatch } from 'react';
import Typography from '@mui/material/Typography';
import DialogContentText from '@mui/material/DialogContentText';
import { alpha, styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { makeStyles } from '@material-ui/core';
import { AMOUNT_DROP_DOWN } from '../../../utilities/const';
import { ModalLoading, ModalSuccess } from './ModalLoadingSuccess';
import { connect } from 'react-redux';
import { IAction, GetListData } from "../../../actions";
import { IAppState } from '../../../store';
import { ListItemData } from '../../../constants/item-data';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

const useStyles = makeStyles((theme) => ({
    itemStyle: {
        fontFamily: 'Dosis !important',
        fontSize: '18px !important',
        fontWeight: 500,
        padding: '5px 0'
    },
    subItemStlye: {
        fontFamily: 'Dosis !important',
        fontSize: '17px !important',
        fontWeight: 500,
        padding: '0 0 7px 0',
        color: '#5C6269'
    },
    inputs: {
        fontFamily: 'Dosis !important',
        color: 'pink !important'
    },
    purchasedTxt: {
        fontFamily: 'Dosis !important',
        color: '#9CA8B4'
    }
  }));

  const CssTextField = styled(TextField)({
    "& .MuiFormLabel-root": {
        fontFamily: 'Dosis !important',
        color: "#9CA8B4",
        fontSize: '17px'
      },
    '& .MuiOutlinedInput-root': {
        color: '#9CA8B4',
      '& fieldset': {
        borderColor: '#D5DFE9',
      },
      '&:hover fieldset': {
        borderColor: '#D5DFE9',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#D5DFE9',
      },
      fontFamily: [
        'Dosis !important'
      ].join(','),
    },
  });

interface IEditProps {
    setListItemData(x): any;
    componentProps: ListItemData,
    modalLoading: number
  }

interface IAddProps {
    setListItemData(x): any;
    modalLoading: number
  }

const PurchasedText = () => {
    const classes = useStyles();
    return (
        <div className={classes.purchasedTxt}>Purchased</div>
    )
}

const ModalEditItems: React.FC<IEditProps> = ({ setListItemData, componentProps, modalLoading }) => {
    
    const classes = useStyles();

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
            <div className={classes.itemStyle}>
                Edit an item
            </div>
            <div className={classes.subItemStlye}>
                Edit your item below
            </div>
            <CssTextField
                className={classes.inputs}
                margin="dense"
                id="outlined-basic" 
                label="Item Name" 
                variant="outlined"
                value={name}
                name="name" 
                fullWidth
                onChange={handleFormChange} 
                />

            <CssTextField
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

            <CssTextField
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
            </CssTextField>
            <FormControlLabel 
            control={
            <Checkbox
            sx={{
                color: '#C6C6C6',
                '&.Mui-checked': {
                  color: '#4C81B7',
                },
              }}
                checked={checked}
                onChange={handleToggle}
                inputProps={{ 'aria-label': 'controlled' }}
            />
            } label={PurchasedText()} 
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

    const classes = useStyles();

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
            <div className={classes.itemStyle}>
                Add an item
            </div>
            <div className={classes.subItemStlye}>
                Add your new item below
            </div>
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