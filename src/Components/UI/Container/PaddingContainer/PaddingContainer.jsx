import React from 'react'
import { cx } from '../../../../Utils/classnames'
import classes from './PaddingContainer.module.css'

const PaddingContainer = (props) => {
    const { children, className } = props
    return (
        <div className={cx(classes.main, className)}>
            {children}
        </div>
    )
}

export default PaddingContainer