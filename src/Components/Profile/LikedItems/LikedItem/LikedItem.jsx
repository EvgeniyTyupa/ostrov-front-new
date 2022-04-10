import { IconButton } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { cx } from '../../../../Utils/classnames'
import { discountParser } from '../../../../Utils/discountParser'
import { priceParser } from '../../../../Utils/priceParser'
import classes from './LikedItem.module.css'

const LikedItem = (props) => {
    const { item, currentLanguage, isLast } = props

    const navigate = useNavigate()

    const [discount, setDiscount] = useState(null)

    let price = priceParser(item.price)

    const onClick = () => {
        let itemName = currentLanguage === "ru" ? item.name : item.name_ua

        navigate(`/item/${itemName}`)
    }

    useEffect(() => {
        if(item && item.in_action) {
            setDiscount(discountParser(item.price, item.discount))
        }
    }, [item])

    return (
        <div className={cx(classes.main, isLast ? classes.last : undefined)} onClick={onClick}>
            <img src={item.images[0]} alt={item.name} className={classes.img}/>
            <div className={classes.info}>
                <div className={classes.names}>
                    <p className={classes.name}>{currentLanguage === "ru" ? item.name : item.name_ua}</p>
                    {item.brand && <span className={classes.brand}>{item.brand.name}</span>}
                </div>
                <div className={classes.priceBlock}>
                    {(item.in_action && item.from_sum_in_bill === 0 && !item.from_items_count) && 
                        <p className={classes.discount}>{discount} грн</p>
                    }
                    <p className={cx(classes.price, (item.in_action && (item.from_sum_in_bill === 0 && !item.from_items_count)) ? classes.inAction : undefined)}>{price} грн</p>
                </div>
            </div>
        </div>
    )
}

export default LikedItem