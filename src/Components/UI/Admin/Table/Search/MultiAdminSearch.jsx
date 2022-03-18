import React from 'react'
import useDebounce from '../../../../../Utils/debounce';
import CustomAutocomplete from '../../../Form/Autocomplete'

const MultiAdminSearch = (props) => {
    const { 
        onSearch, 
        items, 
        value, 
        error, 
        setValue, 
        onChange,
    } = props

    const debouncedSearchTerm = useDebounce(searchValue, 500);

    const handleValue = (name, newValue) => {
        setValue(name, newValue)
    }

    return (
        <></>
    )
}

export default MultiAdminSearch