import { Drawer } from '@mui/material'
import { IconButton } from '@mui/material'
import React from 'react'
import { NavLink } from 'react-router-dom'
import { AiOutlineClose } from 'react-icons/ai';
import { HiMenu } from 'react-icons/hi';
import classes from './Burger.module.css'
import { useState } from 'react';
import { Button } from '@mui/material';
import { connect } from 'react-redux';
import { FiUser } from 'react-icons/fi';
import { RiFileListFill } from 'react-icons/ri';
import { useTranslation } from 'react-i18next';
import { setCurrentLanguage, setIsOpenLogin } from '../../../../Redux/commonReducer';
import { PHONE_NUMBER } from '../../../../Utils/constants';
import { Divider } from '@mui/material';

const Burger = (props) => {
    const {
        currentLanguage,
        setCurrentLanguage,
        isAuth,
        setIsOpenLogin
    } = props

    const { t, i18n } = useTranslation()

    const [isOpen, setIsOpen] = useState(false)

    const handleLanguage = (lang) => {
        i18n.changeLanguage(lang)
        setCurrentLanguage(lang)
    }

    const handleOpen = () => {
        setIsOpen(!isOpen)
    }

    const handleOpenLogin = () => {
        setIsOpenLogin(true)
    }

    const anchor = 'left'

    return (
        <div className={classes.main}>
            <div className={classes.burger}>
                <IconButton 
                    onClick={handleOpen}
                >
                    <HiMenu/>
                </IconButton>
            </div>
            <Drawer 
                anchor={anchor} 
                open={isOpen} 
                onClose={handleOpen}
                classes={{ root: classes.root, paper: classes.paper }}
            >
                <div className={classes.header}>
                    <IconButton 
                        onClick={handleOpen}
                        className={classes.closeBut}
                    >
                        <AiOutlineClose/>
                    </IconButton>
                    <div className={classes.langContainer}>
                        <Button onClick={() => handleLanguage("ru")} className={currentLanguage === "ru" ? classes.activeLang : ""}>РУС</Button>
                        <Button onClick={() => handleLanguage("ua")} className={currentLanguage === "ua" ? classes.activeLang : ""} >УКР</Button>
                    </div>
                </div>
                <div className={classes.phoneContainer}>
                    <p>Телефон: </p>
                    <a href={`tel:${PHONE_NUMBER}`}>{PHONE_NUMBER}</a>
                </div>
                <div className={classes.links}>
                    <Button className={classes.catalogBut}>
                        <RiFileListFill/>
                        <p className={classes.catalogHeader}>КАТАЛОГ</p>
                    </Button>
                    {!isAuth && <p onClick={handleOpenLogin}>{t("auth.login")}</p>}
                    {!isAuth && <NavLink onClick={handleOpen} to="/sign_up" className={(navData) => (navData.isActive ? classes.active : '')}>{t("auth.register")}</NavLink>}
                    {isAuth && <NavLink onClick={handleOpen} to="/profile" className={(navData) => (navData.isActive ? classes.active : '')}>{t("auth.profile")}</NavLink>}
                    <NavLink to="/#brands">{t("navigation.brands")}</NavLink>
                    <NavLink to="/actions">{t("navigation.actions")}</NavLink>
                    <NavLink to="/#selector">{t("navigation.byAge")}</NavLink>
                    <NavLink to="/#best">{t("navigation.best")}</NavLink>
                    <NavLink to="/blog">{t("navigation.blog")}</NavLink>
                    <NavLink to="/#news">{t("navigation.news")}</NavLink>
                </div>
                <Divider className={classes.divider}/>
                <div className={classes.footLinks}>
                    <NavLink to="/contacts">{t("navigation.contact")}</NavLink>
                    <NavLink to="/delivery_and_shipping">{t("navigation.delivery")}</NavLink>
                </div>
            </Drawer>
        </div>
    )
}

let mapStateToProps = (state) => ({
    currentLanguage: state.common.currentLanguage,
    isAuth: state.user.isAuth
})

export default connect(mapStateToProps, {
    setCurrentLanguage,
    setIsOpenLogin
})(Burger)