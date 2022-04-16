import React from 'react'
import { Checkbox } from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles((theme) => ({
    root:{
        color: "#677bc5",
        '&.Mui-checked': {
            color: "#4B5EA3 !important"
        }
    }
}));

const CustomCheckbox = (props) => {
    const material = useStyles()

    const {
        label = "",
        checked,
        onChange,
        size = "medium",
        disabled = false
    } = props

    return (
        <FormControlLabel
            control={
                <Checkbox 
                    checked={checked}
                    classes={material}
                    onChange={onChange}
                    size={size}
                    disabled={disabled}
                />
            } 
            label={label}
        />
    )
}

export default CustomCheckbox