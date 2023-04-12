import React, { useEffect } from 'react'
import { FiSearch } from 'react-icons/fi';
import AdminInput from '../../../Form/AdminInput'
import useDebounce from '../../../../../Utils/debounce'

const AdminSearch = (props) => {
    const { onSearch, pageSize, setSearchValue, searchValue, filter = false } = props

    const debouncedSearchTerm = useDebounce(searchValue, 500);

    const handleValue = (value) => {
        setSearchValue(value)
    } 

    useEffect(() => {
        if(debouncedSearchTerm){
            onSearch(0 + 1, pageSize, "", "", searchValue, filter)  
        }
    }, [debouncedSearchTerm])

    useEffect(() => {
        if(searchValue.length === 0 && debouncedSearchTerm){
            onSearch(0 + 1, pageSize, "", "", "", filter)  
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