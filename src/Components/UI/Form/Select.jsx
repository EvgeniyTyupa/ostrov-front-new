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
            borderRadius: "4px",
            backgroundColor: "white"
        },
        '& .MuiFormHelperText-root.Mui-error': {
            margin: 0,
            marginTop: 5,
        },
        '& .MuiList-root .MuiList-padding .MuiMenu-list': {
            display: "flex",
            flexDirection: "column"
        }
    }
}));

const CustomSelect = (props) => {
    const { 
        value, 
        onChange, 
        label, 
        error, 
        children, 
        variant = "outlined",
        multiple = false
    } = props

    const material = useStyles()

    return (
        <TextField
            value={value}
            label={label}
            autoComplete="off"
            error={!!error}
            variant={variant}
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
