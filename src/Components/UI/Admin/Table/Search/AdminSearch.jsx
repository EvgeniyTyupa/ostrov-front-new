import React, { useEffect, useState } from 'react'
import { FiSearch } from 'react-icons/fi';
import AdminInput from '../../../Form/AdminInput'
import useDebounce from '../../../../../Utils/debounce'

const AdminSearch = (props) => {
    const { onSearch, pageSize, setSearchValue, searchValue, isActual = false } = props

    const debouncedSearchTerm = useDebounce(searchValue, 500);

    const handleValue = (e) => {
        setSearchValue(e.target.value)
    } 

    useEffect(() => {
        if(debouncedSearchTerm){
            onSearch(0 + 1, pageSize, "", "", searchValue, isActual)  
        }
    }, [debouncedSearchTerm])

    useEffect(() => {
        if(searchValue.length === 0){
            onSearch(0 + 1, pageSize, "", "", "", isActual)  
        }
    }, [searchValue])

    return (
        <AdminInput
            label="Поиск"
            onChange={handleValue}
            value={searchValue}
            startAdornment={true}
            startAdornmentIcon={<FiSearch/>}
        />
    )
}

export default AdminSearch