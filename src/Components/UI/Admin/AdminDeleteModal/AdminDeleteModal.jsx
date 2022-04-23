import { Button } from '@mui/material'
import React from 'react'
import Modal from '../../Modal/Modal'
import classes from './AdminDeleteModal.module.css'

const AdminDeleteModal = (props) => {
    const { onClose, onRemove, deleteItem, item } = props

    const itemName = item.name || item.title || "администратора " + item.email ||""

    const handleRemove = () => {
        deleteItem(item._id)
        onRemove(null)
    }

    return (
        <Modal title={`Удалить ${itemName}`} onClose={onClose}>
            <p className={classes.text}>Действие нельзя будет отменить. Вы уверены?</p>
            <div className={classes.footer}>
                <Button onClick={handleRemove} color="warning" className={classes.remove}>Удалить</Button>
                <Button onClick={onClose}>Отмена</Button>
            </div>
        </Modal>
    )
}

export default AdminDeleteModal