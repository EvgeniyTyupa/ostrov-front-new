import React, { useEffect, useState } from 'react'
import { Autocomplete, TextField } from '@mui/material';
import { makeStyles } from '@mui/styles'
import useDebounce from '../../../Utils/debounce';
import { useTranslation } from 'react-i18next';

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
        '& .MuiAutocomplete-endAdornment': {
            width: "fit-content !important"
        }
    }
}));

const AddressAutocomplete = (props) => {
    const { 
        onSearch, 
        items, 
        value, 
        error, 
        setValue, 
        name,
        label,
        defaultValue,
        city,
        setCurrentValue,
        placeholder,
        disabled
    } = props

    const material = useStyles()

    const { t } = useTranslation()

    const [searchValue, setSearchValue] = useState("")

    const debouncedSearchTerm = useDebounce(searchValue, 500);
    
    useEffect(() => {
        if(debouncedSearchTerm) {
            if(name === "city"){
                onSearch(searchValue)
            }else if(name === "warehouse" && city){
                onSearch(city.MainDescription, searchValue)
            }
        }
    }, [debouncedSearchTerm, city])

    useEffect(() => {
        if(searchValue.length === 0) {
           setValue(name, null)
        }
    }, [searchValue])

    return (
       <Autocomplete
            disablePortal
            disabled={disabled}
            options={items}
            value={value}
            noOptionsText={t("catalog.empty")}
            getOptionLabel={option => option.Present ? option.Present : option.Description}
            onChange={(e, newValue) => {
                setValue(name, newValue)
                if(name === "city"){
                    setCurrentValue(newValue)
                }
            }}
            onClose={e => setSearchValue("")}
            filterSelectedOptions
            limitTags={150}
            isOptionEqualToValue={(option, value) => option.Present ? (option.Present === value.Preset) : (option.MainDescription === value.MainDescription)}
            style={{ width: "100%" }}
            defaultValue={defaultValue}
            renderInput={(params) => (
                <TextField 
                    {...params} 
                    classes={material}
                    placeholder={placeholder}
                    label={label} 
                    error={!!error} 
                    helperText={error ? error.message : null} 
                    onChange={e => setSearchValue(e.target.value)}     
                />
            )}
       />
    )
}

export default AddressAutocomplete