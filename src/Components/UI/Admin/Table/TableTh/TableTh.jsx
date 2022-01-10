import React from 'react'
import { TableCell } from '@mui/material'
import { AiOutlineArrowUp, AiOutlineArrowDown } from 'react-icons/ai';
import { useState } from 'react';
import classes from './TableTh.module.css'

const TableTh = (props) => {
    const { text, searchByValue, onSort, pageNumber, pageSize, searchValue } = props

    const [isAsc, setIsAsc] = useState(true)

    const handleFrom = () => {
        if(text) {
            let newIsAsc = !isAsc
            setIsAsc(!isAsc)
            onSort(pageNumber + 1, pageSize, searchByValue, newIsAsc ? "asc" : "desc", searchValue)
        }
    }

    return (
        <TableCell onClick={handleFrom} className={classes.main}>
            {text && (isAsc ? <AiOutlineArrowDown/> : <AiOutlineArrowUp/>)}
            <span className={classes.text}>{text}</span>
        </TableCell>
    )
}

export default TableTh