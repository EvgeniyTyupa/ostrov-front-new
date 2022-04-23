import React from 'react'
import classes from './AdminControllButtons.module.css'
import { MdModeEdit, MdDeleteForever } from 'react-icons/md';
import { AiFillEye } from 'react-icons/ai';
import { IconButton } from '@mui/material'

const AdminControllButtons = (props) => {
    const { onEdit, onRemove, onView, item, type = "edit" } = props

    const handleEdit = () => {
        onEdit(item)
    }

    const handleRemove = () => {
        onRemove(item)
    }

    const handleView = () => {
        onView(item)
    }

    return (
        <div className={classes.main}>
            {type === "edit" ? 
                <>
                    <IconButton className={classes.editBut} onClick={handleEdit}>
                        <MdModeEdit/>
                    </IconButton>
                    <IconButton className={classes.delBut} onClick={handleRemove}>
                        <MdDeleteForever/>
                    </IconButton>
                </> : type === "view" ?
                <>
                    <IconButton className={classes.editBut} onClick={handleView}>
                        <AiFillEye/>
                    </IconButton>
                </> : type === "admin" &&
                <>
                    <IconButton className={classes.editBut} onClick={handleView}>
                        <AiFillEye/>
                    </IconButton>
                    <IconButton className={classes.delBut} onClick={handleRemove}>
                        <MdDeleteForever/>
                    </IconButton>
                </>
            }
        </div>
    )
} 

export default AdminControllButtons