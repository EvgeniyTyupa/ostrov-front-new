import React from 'react'
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import { TextField } from '@mui/material';
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
        },
    }
}));

const DatePicker = (props) => {
    const { type = 'single', label, value, onChange, error = null } = props

    const material = useStyles()

    return (
        <>
            {type === "single" &&
                <DesktopDatePicker
                    orientation='landscape'
                    label={label}
                    inputFormat="DD/MM/yyyy"
                    disablePast
                    value={value}
                    onChange={onChange}
                    renderInput={(params) => <TextField {...params} error={!!error} classes={material}/>}
                />
            }
        </>
    )
}

export default DatePicker