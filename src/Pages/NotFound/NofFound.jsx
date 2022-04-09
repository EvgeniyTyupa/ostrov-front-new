import React from 'react'
import classes from './NotFound.module.css'
import not_found from '../../Assets/error404.png'
import PaddingContainer from '../../Components/UI/Container/PaddingContainer/PaddingContainer'
import MaxWidthContainer from '../../Components/UI/Container/MaxWidthContainer/MaxWidthContainer'
import { useTranslation } from 'react-i18next'
import { NavLink } from 'react-router-dom'

const NotFound = () => {
    const { t } = useTranslation()

    return (
       <PaddingContainer>
           <MaxWidthContainer className={classes.container}>
               <h4>{t("notFound.title")}...</h4>
               <NavLink to="/">{t("notFound.link")}</NavLink>
               <img src={not_found} alt="not found"/>
           </MaxWidthContainer>
       </PaddingContainer>
    )
}

export default NotFound