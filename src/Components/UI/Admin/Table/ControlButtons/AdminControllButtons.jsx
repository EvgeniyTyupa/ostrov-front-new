import React from 'react'
import classes from './AdminControllButtons.module.css'
import { MdModeEdit, MdDeleteForever } from 'react-icons/md';
import { IconButton } from '@mui/material'

const AdminControllButtons = (props) => {
    const { onEdit, onRemove, item } = props

    const handleEdit = () => {
        onEdit(item)
    }

    const handleRemove = () => {
        onRemove(item)
    }

    return (
        <div className={classes.main}>
            <IconButton className={classes.editBut} onClick={handleEdit}>
                <MdModeEdit/>
            </IconButton>
            <IconButton className={classes.delBut} onClick={handleRemove}>
                <MdDeleteForever/>
            </IconButton>
        </div>
    )
} 

export default AdminControllButtons