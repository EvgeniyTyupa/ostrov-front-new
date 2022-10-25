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
import { RiFileListFill } from 'react-icons/ri';
import { useTranslation } from 'react-i18next';
import { setCurrentLanguage, setIsOpenLogin } from '../../../../Redux/commonReducer';
import { PHONE_NUMBER } from '../../../../Utils/constants';
import { Divider } from '@mui/material';
import { logout } from '../../../../Redux/userReducer';
import { MdLogout } from 'react-icons/md';

const Burger = (props) => {
    const {
        currentLanguage,
        setCurrentLanguage,
        isAuth,
        setIsOpenLogin,
        setIsOpenMobileCatalog,
        logout,
        siteInfo
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
                        {/* <Button onClick={() => handleLanguage("ru")} className={currentLanguage === "ru" ? classes.activeLang : ""}>РУС</Button>
                        <Button onClick={() => handleLanguage("ua")} className={currentLanguage === "ua" ? classes.activeLang : ""} >УКР</Button> */}
                    </div>
                </div>
                <div className={classes.phoneContainer}>
                    <p>Телефон: </p>
                    <div className={classes.phones}>
                        {siteInfo && siteInfo[0].phones.map(el => (
                            <a href={`tel:${el.replace(/[^a-zA-Z0-9 ]/g, '')}`} key={el}>{el}</a>
                        ))}
                    </div>
                </div>
                <div className={classes.links}>
                    <Button className={classes.catalogBut} onClick={() => setIsOpenMobileCatalog(true)}>
                        <RiFileListFill/>
                        <p className={classes.catalogHeader}>КАТАЛОГ</p>
                    </Button>
                    {!isAuth && <p onClick={handleOpenLogin}>{t("auth.login")}</p>}
                    {!isAuth && <NavLink onClick={handleOpen} to="/sign_up" className={(navData) => (navData.isActive ? classes.active : '')}>{t("auth.register")}</NavLink>}
                    {isAuth && <NavLink onClick={handleOpen} to="/profile" className={(navData) => (navData.isActive ? classes.active : '')}>{t("auth.profile")}</NavLink>}
                    <NavLink onClick={handleOpen} to="/#brands">{t("navigation.brands")}</NavLink>
                    <NavLink onClick={handleOpen} to="/actions">{t("navigation.actions")}</NavLink>
                    <NavLink onClick={handleOpen} to="/#selector">{t("navigation.byAge")}</NavLink>
                    <NavLink onClick={handleOpen} to="/#best">{t("navigation.best")}</NavLink>
                    <NavLink onClick={handleOpen} to="/blog">{t("navigation.blog")}</NavLink>
                    <NavLink onClick={handleOpen} to="/#news">{t("navigation.news")}</NavLink>
                </div>
                <Divider className={classes.divider}/>
                <div className={classes.footLinks}>
                    <NavLink to="/contacts">{t("navigation.contact")}</NavLink>
                    <NavLink to="/delivery_and_shipping">{t("navigation.delivery")}</NavLink>
                    <Button onClick={logout} className={classes.exit}>
                        <MdLogout/>
                        <p style={{ marginLeft: "8px" }} className={classes.menuItem}>{t("auth.logout")}</p>
                    </Button>
                </div>
            </Drawer>
        </div>
    )
}

let mapStateToProps = (state) => ({
    currentLanguage: state.common.currentLanguage,
    isAuth: state.user.isAuth,
    siteInfo: state.common.siteInfo
})

export default connect(mapStateToProps, {
    setCurrentLanguage,
    setIsOpenLogin,
    logout
})(Burger)