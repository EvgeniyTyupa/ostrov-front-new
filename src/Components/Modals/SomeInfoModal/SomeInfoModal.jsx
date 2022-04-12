import React from 'react'
import Modal from '../../UI/Modal/Modal'
import classes from './SomeInfoModal.module.css'

const SomeInfoModal = (props) => {
    const { text, onClose } = props

    return (
        <Modal title="" onClose={onClose}>
            <div className={classes.main}>
                {text.split("\n").map(el => (
                    <p key={el}>{el}</p>
                ))}
            </div>
        </Modal>
    )
}

export default SomeInfoModal