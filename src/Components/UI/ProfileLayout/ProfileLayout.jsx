import { Button } from '@mui/material'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { useProfileMenu } from '../../../Hooks/useProfileMenu'
import { logout } from '../../../Redux/userReducer'
import AnimatedBlock from '../../Animation/AnimatedBlock/AnimatedBlock'
import MaxWidthContainer from '../Container/MaxWidthContainer/MaxWidthContainer'
import PaddingContainer from '../Container/PaddingContainer/PaddingContainer'
import classes from './ProfileLayout.module.css'

const ProfileLayout = (props) => {
    const { children, title, logout } = props

    const { t } = useTranslation()

    const menuItems = useProfileMenu()

    return (
        <PaddingContainer className={classes.main}>
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
                </AnimatedBlock>
                <div className={classes.content}>
                    <div className={classes.header}>
                        <h4>{title}</h4>
                        <Button onClick={() => logout()}>{t("auth.logout")}</Button>
                    </div>
                    {children}
                </div>
            </MaxWidthContainer>
        </PaddingContainer>
    )
}

export default connect(null, {
    logout
})(ProfileLayout)