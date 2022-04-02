import React from 'react'
import classes from './SmallItemsList.module.css'
import { useTranslation } from 'react-i18next'
import { NavLink } from 'react-router-dom'
import CustomSlider from '../../Slider/CustomSlider'
import SmallItem from '../SmallItem/SmallItem'

const SmallItemsList = (props) => {
    const { items, href, title, slidesToShow = 5 } = props

    const { t } = useTranslation()

    return (
        <div className={classes.main}>
            <div className={classes.header}>
                <h4>{title}</h4>
                <NavLink to={href}>{t("items.listTextHref")}</NavLink>
            </div>
            <div className={classes.slider}>
                <CustomSlider slidesToShow={slidesToShow}>
                    {items.map(item => <SmallItem key={item._id} item={item}/>)}
                </CustomSlider>
            </div>
        </div>
    )
}

export default SmallItemsList