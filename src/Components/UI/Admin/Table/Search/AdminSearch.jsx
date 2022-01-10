import React, { useState } from 'react'
import { FiSearch } from 'react-icons/fi';
import AdminInput from '../../../Form/AdminInput'

const AdminSearch = (props) => {
    const { onSearch, pageSize, setSearchValue, searchValue } = props

    const handleValue = (e) => {
        setSearchValue(e.target.value)
        onSearch(0 + 1, pageSize, "", "", e.target.value)        
    } 

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