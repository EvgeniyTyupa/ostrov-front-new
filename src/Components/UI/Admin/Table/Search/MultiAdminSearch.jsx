import React, { useEffect, useState } from 'react'
import { Autocomplete, TextField } from '@mui/material';
import { makeStyles } from '@mui/styles'
import useDebounce from '../../../../../Utils/debounce';
import CustomAutocomplete from '../../../Form/Autocomplete'

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

const MultiAdminSearch = (props) => {
    const { 
        onSearch, 
        items, 
        value, 
        error, 
        setValue, 
        onChange,
        name,
        label,
        defaultValue
    } = props

    const material = useStyles()

    const [searchValue, setSearchValue] = useState("")

    const debouncedSearchTerm = useDebounce(searchValue, 500);
    
    useEffect(() => {
        if(debouncedSearchTerm) {
            onSearch(1, 1000, "", "", searchValue, false)
        }
    }, [debouncedSearchTerm])

    useEffect(() => {
        if(searchValue.length === 0) {
            onSearch(1, 1000, "", "", "", false)
        }
    }, [searchValue])

    return (
       <Autocomplete
            multiple={true}
            disablePortal
            options={items}
            value={value}
            getOptionLabel={option => option.name}
            onChange={(e, newValue) => {
                setValue(name, newValue)
            }}
            onClose={e => setSearchValue("")}
            filterSelectedOptions
            limitTags={100}
            isOptionEqualToValue={(option, value) => option._id === value._id}
            style={{ width: "100%" }}
            defaultValue={defaultValue}
            renderInput={(params) => (
                <TextField 
                    {...params} 
                    classes={material} 
                    label={label} 
                    error={!!error} 
                    helperText={error ? error.message : null} 
                    onChange={e => setSearchValue(e.target.value)}     
                />
            )}
       />
    )
}

export default MultiAdminSearch