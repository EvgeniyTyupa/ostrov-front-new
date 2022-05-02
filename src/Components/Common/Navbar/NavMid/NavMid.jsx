import React from 'react'
import PaddingContainer from '../../../UI/Container/PaddingContainer/PaddingContainer'
import classes from './NavMid.module.css'
import logo from '../../../../Assets/logo.png'
import { NavLink } from 'react-router-dom'
import Search from './Search/Search'
import MaxWidthContainer from '../../../UI/Container/MaxWidthContainer/MaxWidthContainer'
import BadgePanel from './BadgePanel/BadgePanel'
import { PHONE_NUMBER } from '../../../../Utils/constants'

const NavMid = (props) => {
    const { isAuth, user, totalItemsCart } = props

    return (
        <PaddingContainer className={classes.main}>
            <MaxWidthContainer className={classes.container}>
                <div className={classes.logoContainer}>
                    <NavLink to="/">
                        <img src={logo} alt="logo" className={classes.logo}/>
                    </NavLink>
                </div>
                <div className={classes.content}>
                    <Search className={classes.desktop}/>
                    <a href={`tel:${PHONE_NUMBER}`} className={classes.phoneNumber}>{PHONE_NUMBER}</a>
                    <BadgePanel isAuth={isAuth} user={user} totalItemsCart={totalItemsCart}/>
                </div>
            </MaxWidthContainer>
        </PaddingContainer>
    )
}

export default NavMid