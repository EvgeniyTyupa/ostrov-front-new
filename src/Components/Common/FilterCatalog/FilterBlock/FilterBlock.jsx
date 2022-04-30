import { IconButton } from '@mui/material'
import React from 'react'
import { useState } from 'react'
import classes from './FilterBlock.module.css'
import { MdExpandMore } from 'react-icons/md'
import { Collapse } from '@mui/material'

const FilterBlock = (props) => {
    const { 
        title,
        children
    } = props

    const [open, setOpen] = useState(true)

    const handleOpen = () => {
        setOpen(!open)
    }

    return (
        <div className={classes.main}>
            <div className={classes.header}>
                <h4>{title}</h4>
                <IconButton onClick={handleOpen}>
                    <MdExpandMore className={open ? classes.open : ""}/>
                </IconButton>
            </div>
            <Collapse in={open} timeout="auto" unmountOnExit>
                {children}
            </Collapse>
        </div>
    )
}

export default FilterBlock