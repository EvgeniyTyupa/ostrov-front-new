import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import classes from './SmallItem.module.css'
import { Rating } from 'react-simple-star-rating'
import { Button } from '@mui/material'
import { useTranslation } from 'react-i18next'
import moment from 'moment'
import Baige from './Baige/Baige'
import { useNavigate } from 'react-router-dom'
import { priceParser } from '../../../../Utils/priceParser'
import { discountParser } from '../../../../Utils/discountParser'
import { cx } from '../../../../Utils/classnames'

const SmallItem = (props) => {
    const { item, currentLanguage, className } = props

    // console.log(item)

    const { t } = useTranslation()

    const [isNew, setIsNew] = useState(false)
    const [discount, setDiscount] = useState(null)

    const navigate = useNavigate()

    const rating = item.rating * 20

    const handleClick = () => {
        let itemName = currentLanguage === "ru" ? item.name : item.name_ua

        navigate(`/item/${itemName}`)
    }

    let price = priceParser(item.price)
    
    useEffect(() => {
        if(item && item.action) {
            setDiscount(discountParser(item.price, item.action.discount))
        }
    }, [item])

    useEffect(() => {
        if(moment(item.created_at).diff(moment(), 'days') >= -30) {
            setIsNew(true)
        }
    }, [])

    return (
        <div className={cx(classes.main, className)}  onClick={handleClick}>
            <div className={classes.baiges}>
                {isNew && <Baige type="new"/>}
                {(item.action && !item.action.from_items_count && !item.action.from_sum_in_bill) 
                    && <Baige type="discount" value={item.action.discount}/>
                }
            </div>
            <img src={item.images[0]} alt="image" className={classes.image} referrerpolicy="no-referrer"/>
            <div className={classes.info}>
                <div className={classes.left}>
                    <p>{
                        currentLanguage === "ru" ? item.name
                        : item.name_ua   
                    }</p>
                    <Rating size={"22px"} ratingValue={rating} readonly/>
                </div>
                <div className={classes.price}>
                    {(item.action && item.action.from_sum_in_bill === 0 && !item.action.from_items_count) && 
                        <p className={classes.discount}>{discount} грн</p>
                    }
                    <p className={cx(classes.price, (item.action && (item.action.from_sum_in_bill === 0 && !item.action.from_items_count)) ? classes.inAction : undefined)}>{price} грн</p>
                </div>
            </div>
            <Button
                className={classes.buyBut}
                onClick={handleClick}
            >
                {t("actions.buy")}
            </Button>
        </div>
    )
}

let mapStateToProps = (state) => ({
    currentLanguage: state.common.currentLanguage
})

export default connect(mapStateToProps, null)(SmallItem)