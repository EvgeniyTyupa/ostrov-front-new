import React from 'react'
import classes from './Error.module.css'

const Error = (props) => {
    const { text } = props 

    return (
        <p className={classes.main}>{text}</p>
    )
}

export default Error