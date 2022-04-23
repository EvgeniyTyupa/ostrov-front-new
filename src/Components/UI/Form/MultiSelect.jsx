import { Select } from '@mui/material'
import React from 'react'
import AdminInput from './AdminInput'

const MultiSelect = (props) => {
    const {
        label,
        children
    } = props

    return (
        <Select
            input={<AdminInput label={label}/>}
        >
            {children}
        </Select>
    )
}

export default MultiSelect