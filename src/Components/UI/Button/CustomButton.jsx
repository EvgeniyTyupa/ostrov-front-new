import React from 'react'
import classes from './CustomButton.module.css'
import { Button } from '@mui/material'
import { cx } from '../../../Utils/classnames'

const CustomButton = (props) => {
    const { className, type = "button", onClick, children } = props

    return (
        <Button 
            className={cx(classes.main, className)}
            type={type}
            onClick={onClick}
        >
            {children}
        </Button>
    )
}

export default CustomButton