import React from 'react'
import classes from './BrandItem.module.css'
import { useNavigate } from 'react-router-dom'

const BrandItem = (props) => {
    const { item } = props

    const navigate = useNavigate()

    const onClick = () => {
        navigate(`/catalog?pageNumber=1&pageSize=25&searchBy=brand&from=desc&searchValue=${item._id}`)
    }

    return (
        <img 
            src={item.image} 
            alt={item.name}
            className={classes.main}
            onClick={onClick}
            referrerpolicy="no-referrer"
        />
    )
}

export default BrandItem