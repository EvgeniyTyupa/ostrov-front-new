import React from 'react'
import Autocomplete from '@mui/material/Autocomplete';
import { TextField } from '@mui/material'
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

const CustomAutocomplete = (props) => {
    const { items, onChange, label, multiple = false, error, setValue, name, value, defaultValue = null } = props

    const material = useStyles()

    return (
        <Autocomplete
            disablePortal
            options={items}
            value={value}
            getOptionLabel={option => option.name_ua ? option.name_ua : option.name}
            onChange={(event, newValue) => {
                setValue(name, newValue)
            }}
            multiple={multiple}
            filterSelectedOptions
            limitTags={10}
            isOptionEqualToValue={(option, value) => option._id === value._id}
            style={{ width: "100%" }}
            defaultValue={defaultValue}
            renderInput={(params) => <TextField {...params} classes={material} label={label} error={!!error} helperText={error ? error.message : null} />}
        />
    )
}

export default CustomAutocomplete