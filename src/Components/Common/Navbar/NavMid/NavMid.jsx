import React from 'react'
import PaddingContainer from '../../../UI/Container/PaddingContainer/PaddingContainer'
import classes from './NavMid.module.css'
import logo from '../../../../Assets/logo.png'
import { NavLink } from 'react-router-dom'
import Search from './Search/Search'
import MaxWidthContainer from '../../../UI/Container/MaxWidthContainer/MaxWidthContainer'
import BadgePanel from './BadgePanel/BadgePanel'
import { useState } from 'react'

const NavMid = (props) => {
    const { 
        isAuth, 
        user, 
        totalItemsCart, 
        setIsOpenMobileCatalog, 
        isOpenMobileCatalog, 
        siteInfo
    } = props

    const [showPhones, setShowPhones] = useState(true)

    return (
        <PaddingContainer className={classes.main}>
            <MaxWidthContainer className={classes.container}>
                <div className={classes.logoContainer}>
                    <NavLink to="/">
                        <img src={logo} alt="logo" className={classes.logo}/>
                    </NavLink>
                </div>
                <div className={classes.content}>
                    <Search className={classes.desktop} setShowPhones={setShowPhones}/>
                    <div className={classes.deskPhones}>
                        {siteInfo && siteInfo[0].phones.map(el => (
                            <a href={`tel:${el.replace(/[^a-zA-Z0-9 ]/g, '')}`} className={classes.phoneNumber}>{el}</a>
                        ))}
                    </div>
                    {!showPhones && <div className={classes.phones}>
                        {siteInfo && siteInfo[0].phones.map(el => (
                            <a href={`tel:${el.replace(/[^a-zA-Z0-9 ]/g, '')}`} className={classes.phoneNumber}>{el}</a>
                        ))}
                    </div>}
                    <BadgePanel isAuth={isAuth} user={user} totalItemsCart={totalItemsCart} setIsOpenMobileCatalog={setIsOpenMobileCatalog} isOpenMobileCatalog={isOpenMobileCatalog}/>
                </div>
            </MaxWidthContainer>
        </PaddingContainer>
    )
}

export default NavMid