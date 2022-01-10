import React from 'react'
import { cx } from '../../../../Utils/classnames'
import classes from './Field.module.css'

const Field = (props) => {
    const { className, children } = props

    return (
        <div className={cx(classes.main, className)}>
            {children}
        </div>
    )
}

export default Field