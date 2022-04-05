import React from 'react'
import MaxWidthContainer from '../../../UI/Container/MaxWidthContainer/MaxWidthContainer'
import PaddingContainer from '../../../UI/Container/PaddingContainer/PaddingContainer'
import classes from './NavBot.module.css'
import { RiFileListFill } from 'react-icons/ri';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const NavBot = (props) => {
    const { t } = useTranslation()

    return (
        <PaddingContainer className={classes.main}>
            <MaxWidthContainer className={classes.container}>
                <div className={classes.catalogContainer}>
                    <RiFileListFill/>
                    <p>КАТАЛОГ</p>
                </div>
                <div className={classes.links}>
                    <NavLink to="/#brands">{t("navigation.brands")}</NavLink>
                    <NavLink to="/actions">{t("navigation.actions")}</NavLink>
                    <NavLink to="/#selector">{t("navigation.byAge")}</NavLink>
                    <NavLink to="/#best">{t("navigation.best")}</NavLink>
                    <NavLink to="/blog">{t("navigation.blog")}</NavLink>
                    <NavLink to="/#news">{t("navigation.news")}</NavLink>
                </div>
            </MaxWidthContainer>
        </PaddingContainer>
    )
}

export default NavBot