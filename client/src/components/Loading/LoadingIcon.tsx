import React from 'react'
import { Box, CircularProgress } from '@material-ui/core'

export const LoadingIcon = () => {
    return (
        <div>
            <Box textAlign="center" p={5}>
                <CircularProgress thickness={5} size={100} />
            </Box>
        </div>
    )
}