import React from 'react'
import PaddingContainer from '../../../UI/Container/PaddingContainer/PaddingContainer'
import classes from './NavMid.module.css'
import logo from '../../../../Assets/logo.png'
import { NavLink } from 'react-router-dom'
import Search from './Search/Search'
import MaxWidthContainer from '../../../UI/Container/MaxWidthContainer/MaxWidthContainer'
import BadgePanel from './BadgePanel/BadgePanel'

const NavMid = (props) => {
    const { isAuth, user } = props

    return (
        <PaddingContainer className={classes.main}>
            <MaxWidthContainer className={classes.container}>
                <div className={classes.logoContainer}>
                    <NavLink to="/">
                        <img src={logo} alt="logo" className={classes.logo}/>
                    </NavLink>
                </div>
                <div className={classes.content}>
                    <Search/>
                    <a href='tel:123456789' className={classes.phoneNumber}>123456789</a>
                    <BadgePanel isAuth={isAuth} user={user}/>
                </div>
            </MaxWidthContainer>
        </PaddingContainer>
    )
}

export default NavMid