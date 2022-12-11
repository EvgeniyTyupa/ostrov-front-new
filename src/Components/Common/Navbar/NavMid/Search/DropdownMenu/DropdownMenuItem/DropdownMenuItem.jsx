import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { cx } from '../../../../../../../Utils/classnames'
import { discountParser } from '../../../../../../../Utils/discountParser'
import { priceParser } from '../../../../../../../Utils/priceParser'
import classes from './DropdownMenuItem.module.css'

const DropdownMenuItem = (props) => {
    const { item, currentLanguage, isLast } = props

    const navigate = useNavigate()

    const [discount, setDiscount] = useState(null)

    let price = priceParser(item.price)

    const onClick = () => {
        navigate(`/item/${item.url_code}`)
    }

    useEffect(() => {
        if(item && item.action) {
            setDiscount(discountParser(item.price, item.action.discount))
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
                    {(item.action && item.action.from_sum_in_bill === 0 && !item.action.from_items_count) && 
                        <p className={classes.discount}>{discount} грн</p>
                    }
                    <p className={cx(classes.price, (item.action && (item.action.from_sum_in_bill === 0 && !item.action.from_items_count)) ? classes.inAction : undefined)}>{price} грн</p>
                </div>
            </div>
        </div>
    )
}

export default DropdownMenuItem