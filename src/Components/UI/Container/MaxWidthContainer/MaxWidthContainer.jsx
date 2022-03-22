import React from 'react'
import { cx } from '../../../../Utils/classnames'
import classes from './MaxWidthContainer.module.css'

const MaxWidthContainer = (props) => {
    const { children, className } = props

    return (
        <div className={cx(classes.main, className)}>
            {children}
        </div>
    )
}

export default MaxWidthContainer