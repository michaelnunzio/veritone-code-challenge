import React, { useState } from 'react';
import { Button } from '@material-ui/core';
import axios from 'axios';

interface SLProps {
    id: number
}

export const ModalUpdateButton: React.FC<SLProps> = (props) => {
    // Redux modal loading state
    const { id } = props;
    const updateItem = () => {
        axios.patch(`/updateItem/${id}`,
        {
            //replace will real post data
            "purchased": true,
            "itemAmount": 7
        }
        ).then((x) => {
            console.log(x);
        });
    }

    // Set up loading state in Redux
    // Pass Form Data to Redux => Modal Types => This component
    // When Success: refetch => Success Message on Modal => Reset form state

    return (
        <>
            <Button 
            onClick={()=> updateItem()}
            >Save Item?</Button>
        </>
    )
}