import { Button } from '@mui/material'
import React from 'react'
import { Helmet } from 'react-helmet'
import { useTranslation } from 'react-i18next'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { useProfileMenu } from '../../../Hooks/useProfileMenu'
import { logout } from '../../../Redux/userReducer'
import AnimatedBlock from '../../Animation/AnimatedBlock/AnimatedBlock'
import MaxWidthContainer from '../Container/MaxWidthContainer/MaxWidthContainer'
import PaddingContainer from '../Container/PaddingContainer/PaddingContainer'
import classes from './ProfileLayout.module.css'
import ProfileMobileMenu from './ProfileMobileMenu/ProfileMobileMenu'

const ProfileLayout = (props) => {
    const { children, title, logout, user } = props

    const { t } = useTranslation()

    const menuItems = useProfileMenu()

    return (
        <PaddingContainer className={classes.main}>
            <Helmet 
                htmlAttributes={{"lang": "ua", "amp": undefined}}
                title={`${t("siteName")} | ${t("profile.menu.account")}`}
                meta={[{"name": "description", "content": t("siteDescription")}]}
            />
            <MaxWidthContainer className={classes.container}>
                <AnimatedBlock 
                    className={classes.menu}
                    initial={{opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    duration={.3}
                >
                    {menuItems.map(el => (
                        <NavLink 
                            key={el.href}
                            className={({isActive}) => (isActive ? classes.active : '')} 
                            to={el.href}
                            end
                        >
                            {el.text}
                        </NavLink>
                    ))}
                    {user && user.adminLevel > 0 && (
                         <NavLink 
                            className={({isActive}) => (isActive ? classes.active : '')} 
                            to={'/config_toys'}
                            end
                            target={"_blank"}
                        >
                            Адмін. Панель
                        </NavLink>
                    )}
                </AnimatedBlock>
                <div className={classes.content}>
                    <div className={classes.header}>
                        <h4>{title}</h4>
                        <Button className={classes.exit} onClick={() => logout()}>{t("auth.logout")}</Button>
                        <div className={classes.mobileMenu}>
                            <ProfileMobileMenu logout={logout} user={user}/>
                        </div>
                    </div>
                    {children}
                </div>
            </MaxWidthContainer>
        </PaddingContainer>
    )
}

let mapStateToProps = (state) => ({
    user: state.user.user
})

export default connect(mapStateToProps, {
    logout
})(ProfileLayout)