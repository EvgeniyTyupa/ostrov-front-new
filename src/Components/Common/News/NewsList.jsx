import React from 'react'
import classes from './NewsList.module.css'
import { useTranslation } from 'react-i18next'
import { NavLink } from 'react-router-dom'
import CustomSlider from '../Slider/CustomSlider'
import NewsSmallItem from './NewsSmallItem/NewsSmallItem'

const NewsList = (props) => {
    const { items, href, title, slidesToShow = 5 } = props

    const { t } = useTranslation()

    return (
        <div className={classes.main}>
            <div className={classes.header}>
                <h4>{title}</h4>
                <NavLink to={href}>{t("news.all")}</NavLink>
            </div>
            <div className={classes.slider}>
                <CustomSlider slidesToShow={slidesToShow}>
                    {items.map(el => <NewsSmallItem key={el._id} item={el} className={classes.item}/>)}
                </CustomSlider>
            </div>
        </div>
    )
}

export default NewsList