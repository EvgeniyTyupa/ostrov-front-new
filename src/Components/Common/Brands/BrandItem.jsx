import React from 'react'
import classes from './BrandItem.module.css'

const BrandItem = (props) => {
    const { item } = props

    const onClick = () => {
        console.log(item.name)
    }

    return (
        <img 
            src={item.image} 
            alt={item.name}
            className={classes.main}
            onClick={onClick}
        />
    )
}

export default BrandItem