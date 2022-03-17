import React from 'react'
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import { TextField } from '@mui/material';
import { makeStyles } from '@mui/styles'
import moment from 'moment'

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

const EndDatePicker = (props) => {
    const { 
        type = 'single', 
        label, 
        value, 
        onChange, 
        error = null,
        setMaxDate,
        minDate
    } = props

    const material = useStyles()

    const handleChange = (e) => {
        onChange(e)
        setMaxDate(e)
    }

    return (
        <>
            {type === "single" &&
                <DesktopDatePicker
                    orientation='landscape'
                    label={label}
                    inputFormat="DD/MM/yyyy"
                    disablePast
                    value={value}
                    onChange={handleChange}
                    minDate={minDate}
                    renderInput={(params) => <TextField {...params} error={!!error} classes={material}/>}
                />
            }
        </>
    )
}

export default EndDatePicker