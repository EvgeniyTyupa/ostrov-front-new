import React, { useEffect, useState } from 'react'
import { cx } from '../../../../Utils/classnames'
import classes from './OrderStatusLabel.module.css'

const OrderStatusLabel = (props) => {
    const { status } = props

    const [statusProperties, setStatusProperties] = useState({
        color: "gray",
        background: "rgba(128, 128, 128, 3)"
    })

    useEffect(() => {
        switch(status) {
            case "new": {
                setStatusProperties({
                    backgroundColor: "#4B5EA3",
                    text: "Новый"
                })
            }
        }
    }, [status])

    return (
        <div 
            className={classes.main}
            style={{
                backgroundColor: statusProperties.backgroundColor
            }}
        >
            <label>{statusProperties.text}</label>
        </div>
    )
}

export default OrderStatusLabel