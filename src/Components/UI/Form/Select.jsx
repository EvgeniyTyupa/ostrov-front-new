import { TextField } from '@mui/material'
import React from 'react'
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiMenuItem-root .MuiMenuItem-gutters .MuiButtonBase-root': {
            display: "flex !important",
        },
        '& .MuiMenuItem-root': {
            display: "flex"
        },
        '& label.Mui-focused': {
            color: '#4B5EA3'
        },
        '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#4B5EA3' 
        },
        '& .MuiOutlinedInput-root': {
            borderRadius: 0,
            borderRadius: "4px"
        },
        '& .MuiFormHelperText-root.Mui-error': {
            margin: 0,
            marginTop: 5,
        }
    }
}));

const CustomSelect = (props) => {
    const { value, onChange, label, error, children } = props

    const material = useStyles()

    return (
        <TextField
            value={value}
            label={label}
            autoComplete="off"
            error={!!error}
            helperText={error ? error.message : null}
            onChange={onChange}
            select  
            classes={material}
        >
            {children}
        </TextField>
    )
}

export default CustomSelect
