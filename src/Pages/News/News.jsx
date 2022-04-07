import React from 'react'
import { useTranslation } from 'react-i18next'
import Breadcrumbs from '../../Components/Common/Breadcrumbs/Breadcrumbs'
import NewsSmallItem from '../../Components/Common/News/NewsSmallItem/NewsSmallItem'
import MaxWidthContainer from '../../Components/UI/Container/MaxWidthContainer/MaxWidthContainer'
import PaddingContainer from '../../Components/UI/Container/PaddingContainer/PaddingContainer'
import classes from './News.module.css'

const News = (props) => {
    const { news } = props

    const { t } = useTranslation()

    return (
        <PaddingContainer className={classes.main}>
            <MaxWidthContainer className={classes.container}>
                <Breadcrumbs active={t("news.title")}/>
                <div className={classes.wrapper}>
                    {news.map(el => (
                        <NewsSmallItem key={el._id} item={el}/>
                    ))}
                </div>
            </MaxWidthContainer>
        </PaddingContainer>
    )
}

export default News