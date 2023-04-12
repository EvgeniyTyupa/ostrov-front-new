import React, { useEffect, useState } from 'react'
import { useOrderStatuses } from '../../../../Hooks/useOrderStatuses'
import classes from './OrderStatusLabel.module.css'

const OrderStatusLabel = (props) => {
    const { status } = props

    const [statusProperties, setStatusProperties] = useState({
        color: "gray",
        background: "rgba(128, 128, 128, 3)"
    })

    const statuses = useOrderStatuses()

    useEffect(() => {
        statuses.forEach(el => {
            if(el.value === status){
                setStatusProperties(el)
            }
        })
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