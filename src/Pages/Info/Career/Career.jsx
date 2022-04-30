import React from 'react'
import { Helmet } from 'react-helmet'
import { useTranslation } from 'react-i18next'
import AnimatedBlock from '../../../Components/Animation/AnimatedBlock/AnimatedBlock'
import Breadcrumbs from '../../../Components/Common/Breadcrumbs/Breadcrumbs'
import MaxWidthContainer from '../../../Components/UI/Container/MaxWidthContainer/MaxWidthContainer'
import PaddingContainer from '../../../Components/UI/Container/PaddingContainer/PaddingContainer'
import classes from './Career.module.css'

const Career = (props) => {
    const {
        currentLanguage
    } = props

    const { t } = useTranslation()

    return (
        <PaddingContainer>
            <MaxWidthContainer className={classes.main}>
                <Helmet 
                    htmlAttributes={{"lang": "ua", "amp": undefined}}
                    title={`${t("siteName")} | ${currentLanguage === "ru" ? "Сотрудничество" : "Співробітництво"}`}
                    meta={[{"name": "description", "content": t("siteDescription")}]}
                />
                <AnimatedBlock className={classes.body}>
                    <Breadcrumbs active={t("career.title")}/>
                    <h1>{t("career.title")}</h1>
                </AnimatedBlock>
            </MaxWidthContainer>
        </PaddingContainer>
    )
}

export default Career