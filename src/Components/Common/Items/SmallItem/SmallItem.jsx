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

const SmallItem = (props) => {
    const { item, currentLanguage } = props

    // console.log(item)

    const { t } = useTranslation()

    const [isNew, setIsNew] = useState(false)

    const navigate = useNavigate()

    const rating = item.rating * 20

    const handleClick = () => {
        let itemName = currentLanguage === "ru" ? item.name : item.name_ua

        navigate(`/item/${itemName}`)
    }

    let price = priceParser(item.price)
    
    useEffect(() => {
        if(moment(item.created_at).diff(moment(), 'days') >= -30) {
            setIsNew(true)
        }
    }, [])

    return (
        <div className={classes.main}  onClick={handleClick}>
            {isNew && <Baige type="new"/>}
            <img src={item.images[0]} alt="image" className={classes.image}/>
            <div className={classes.info}>
                <div className={classes.left}>
                    <p>{
                        currentLanguage === "ru" ? item.name
                        : item.name_ua   
                    }</p>
                    <Rating size={"22px"} ratingValue={rating} readonly/>
                </div>
                <div className={classes.price}>
                    <p>{price} грн</p>
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