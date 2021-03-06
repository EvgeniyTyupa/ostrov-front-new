import React from 'react'
import { InputAdornment, TextField } from '@mui/material'
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles((theme) => ({
    root:{
        background: "white",
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

const AdminInput = (props) => {
    const { 
        label, 
        variant = "outlined", 
        type = "text", 
        onChange, 
        value, 
        error,
        multiline = false,
        rows = 1,
        endAdornment = false,
        startAdornment = false,
        startAdornmentIcon = null,
        endAdornmentIcon = null,
        regex = null,
        placeholder = "",
        disabled = false
    } = props

    const material = useStyles()

    const handleChange = (e) => {
        if(regex === "number") {
            const onlyNums = e.target.value.replace(/[^0-9]/g, '');
            onChange(onlyNums)
        }else {
            onChange(e.target.value)
        }
    }

    return (
        <TextField
            error={!!error}
            helperText={error ? error.message : null}
            classes={material}
            label={label}
            variant={variant}
            onChange={handleChange}
            placeholder={placeholder}
            value={value}
            autoComplete="off"
            type={type}
            disabled={disabled}
            multiline={multiline}
            rows={rows}
            InputProps={{
                startAdornment: startAdornment && (
                    <InputAdornment position='start' style={{ width: "fit-content", marginRight: "10px" }}>
                        {startAdornmentIcon}
                    </InputAdornment>
                ),
                endAdornment: endAdornment && (
                    <InputAdornment position='end' style={{ width: "fit-content", marginRight: "10px" }}>
                        {endAdornmentIcon}
                    </InputAdornment>
                )
            }}
        />
    )
}

export default AdminInput