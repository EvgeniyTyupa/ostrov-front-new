import React from 'react'
import { Helmet } from 'react-helmet'
import { useTranslation } from 'react-i18next'
import AnimatedBlock from '../../Components/Animation/AnimatedBlock/AnimatedBlock'
import Breadcrumbs from '../../Components/Common/Breadcrumbs/Breadcrumbs'
import NewsSmallItem from '../../Components/Common/News/NewsSmallItem/NewsSmallItem'
import CustomPagination from '../../Components/Common/Pagination/Pagination'
import MaxWidthContainer from '../../Components/UI/Container/MaxWidthContainer/MaxWidthContainer'
import PaddingContainer from '../../Components/UI/Container/PaddingContainer/PaddingContainer'
import classes from './News.module.css'

const News = (props) => {
    const { 
        news,
        currentPage,
        setCurrentPage,
        pageSize,
        setPageSize,
        total
    } = props

    const { t } = useTranslation()

    return (
        <PaddingContainer className={classes.main}>
            <MaxWidthContainer className={classes.container}>
                <Helmet 
                    htmlAttributes={{"lang": "ua", "amp": undefined}}
                    title={`${t("siteName")} | Блог`}
                    meta={[{"name": "description", "content": t("siteDescription")}]}
                />
                <Breadcrumbs active={t("news.title")}/>
                <AnimatedBlock className={classes.wrapper}>
                    {news.map(el => (
                        <NewsSmallItem key={el._id} item={el}/>
                    ))}
                </AnimatedBlock>
                <CustomPagination
                    currentPage={currentPage}
                    pageSize={pageSize}
                    total={total}
                    setCurrentPage={setCurrentPage}
                    setPageSize={setPageSize}
                    sizes={[8, 16, 24, 64]}
                />
            </MaxWidthContainer>
        </PaddingContainer>
    )
}

export default News