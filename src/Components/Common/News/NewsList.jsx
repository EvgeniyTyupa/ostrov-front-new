import React from 'react'
import classes from './NewsList.module.css'
import { useTranslation } from 'react-i18next'
import { NavLink } from 'react-router-dom'
import CustomSlider from '../Slider/CustomSlider'
import NewsSmallItem from './NewsSmallItem/NewsSmallItem'
import { cx } from '../../../Utils/classnames'

const NewsList = (props) => {
    const { items, href, title, slidesToShow = 5 } = props

    const { t } = useTranslation()

    return (
        <div className={classes.main}>
            <div className={classes.header}>
                <h4>{title}</h4>
                {(href && items.length >= 5 ) && <NavLink to={href}>{t("news.all")}</NavLink>}
            </div>
            <div className={cx(classes.slider, items.length < 5 ? classes.notFull : "")}>
                <CustomSlider 
                    slidesToShow={slidesToShow}
                    responsive={[
                        {
                            breakpoint: 1170,
                            settings: {
                              slidesToShow: 3,
                              slidesToScroll: 1,
                            }
                        },
                        {
                            breakpoint: 862,
                            settings: {
                              slidesToShow: 3,
                              slidesToScroll: 1,
                            }
                        },
                        {
                          breakpoint: 600,
                          settings: {
                            slidesToShow: 2,
                            slidesToScroll: 1,
                          }
                        },
                        {
                          breakpoint: 480,
                          settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1
                          }
                        }
                    ]}
                >
                  {items.map(el => <NewsSmallItem key={el._id} item={el} className={classes.item}/>)}
                </CustomSlider>
            </div>
        </div>
    )
}

export default NewsList