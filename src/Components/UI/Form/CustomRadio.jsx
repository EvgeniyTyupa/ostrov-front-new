import { FormControlLabel, Radio } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React from 'react'

const useStyles = makeStyles((theme) => ({
    root: {
        "& .MuiTypography-root": {
            fontFamily: "Montserrat"
        },
        "& .MuiRadio-root.Mui-checked": {
            color: "#4B5EA3 !important"
        },
        "& .MuiRadio-root:hover": {
            backgroundColor: "rgba(75, 94, 163, 0.04)"
        }
    }
}))

const CustomRadio = (props) => {
    const {
        label,
        labelAlign,
        value
    } = props

    const material = useStyles()

    return (
        <FormControlLabel
            classes={material}
            control={
                <Radio 
                    value={value}
                />
            }
            label={label}
            labelPlacement={labelAlign}
        />
    )
}

export default CustomRadio