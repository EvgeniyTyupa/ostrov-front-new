import { FormControl, InputLabel, OutlinedInput, Select } from '@mui/material'
import { makeStyles } from '@mui/styles';
import React from 'react'

const useStyles = makeStyles((theme) => ({
    root: {
        minWidth: "150px",
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
            borderColor: '#4B5EA3 !important' 
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

const MultiSelect = (props) => {
    const {
        label,
        children,
        value,
        onChange,
        options
    } = props

    const material = useStyles()

    return (
        <FormControl classes={material}>
            <InputLabel id="demo-multiple-checkbox-label">{label}</InputLabel>
            <Select
                labelId="demo-multiple-checkbox-label"
                id="demo-multiple-checkbox"
                input={<OutlinedInput label={label}/>}
                multiple
                value={value}
                onChange={onChange}
                renderValue={(selected) => {
                    let view = []
                    selected.forEach(item => {
                        options.forEach(el => {
                            if(item === el.value) {
                                view.push(el.text)
                            }
                        })
                    })
                    
                    return view.length === options.length ? "Все" : view.join(', ')
                }}
            >
                {children}
            </Select>
        </FormControl>
    )
}

export default MultiSelect