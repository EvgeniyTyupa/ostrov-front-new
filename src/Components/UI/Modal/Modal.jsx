import React from 'react'
import classes from './Modal.module.css'
import OverflowLayout from '../OverflowLayout/OverflowLayout'
import { IconButton } from '@mui/material'
import { AiOutlineClose } from 'react-icons/ai';
import { cx } from '../../../Utils/classnames'

const Modal = (props) => {
    const { title, onClose, className, children } = props

    return (
        <OverflowLayout>
            <div className={cx(classes.main, className)}>
                <div className={classes.header}>
                    <h3>{title}</h3>
                    <IconButton onClick={onClose}>
                        <AiOutlineClose/>
                    </IconButton>
                </div>
                <div className={classes.body}>
                    {children}
                </div>
            </div>
        </OverflowLayout>
    )
}

export default Modal