import React from 'react'
import { Helmet } from 'react-helmet'
import { useTranslation } from 'react-i18next'
import Breadcrumbs from '../../../Components/Common/Breadcrumbs/Breadcrumbs'
import PostTypeOne from '../../../Components/Common/News/Post/PostTypeOne/PostTypeOne'
import PostTypeTwo from '../../../Components/Common/News/Post/PostTypeTwo/PostTypeTwo'
import MaxWidthContainer from '../../../Components/UI/Container/MaxWidthContainer/MaxWidthContainer'
import PaddingContainer from '../../../Components/UI/Container/PaddingContainer/PaddingContainer'
import classes from './Post.module.css'

const Post = (props) => {
    const { post, currentLanguage } = props

    const { t } = useTranslation()

    const breadcrumbsItems = [{
        href: '/blog',
        title: t("news.title")
    }]

    const active = currentLanguage === "ru" ? post.title : post.title_ua

    return (
        <PaddingContainer className={classes.main}>
            <MaxWidthContainer className={classes.container}>
                <Helmet 
                    htmlAttributes={{"lang": "ua", "amp": undefined}}
                    title={`${t("siteName")} | ${active}`}
                    meta={[{"name": "description", "content": t("siteDescription")}]}
                />
                <Breadcrumbs items={breadcrumbsItems} active={active}/>
                {post.type === 1 && <PostTypeOne post={post} currentLanguage={currentLanguage}/>}
                {post.type === 2 && <PostTypeTwo post={post} currentLanguage={currentLanguage}/>}
            </MaxWidthContainer>
        </PaddingContainer>
    )
}

export default Post