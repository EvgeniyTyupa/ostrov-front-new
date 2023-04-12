import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { connect } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { setCurrentLanguage } from '../../../Redux/commonReducer'
import { cx } from '../../../Utils/classnames'
import classes from './Navbar.module.css'
import NavBot from './NavBot/NavBot'
import NavMid from './NavMid/NavMid'
import NavTop from './NavTop/NavTop'

const Navbar = (props) => {
    const {
        currentLanguage,
        setCurrentLanguage,
        isAuth,
        user,
        totalItemsCart,
        mainCategoriesWithChildren,
        siteInfo
    } = props

    const { pathname } = useLocation()

    const [scrollPosition, setScrollPosition] = useState(0);

    const [isOpenMobileCatalog, setIsOpenMobileCatalog] = useState(false)

    const handleScroll = () => {
        const position = window.pageYOffset;
        setScrollPosition(position);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll, { passive: true });
    
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <>
            {(!pathname.includes("config_toys") && !pathname.includes("/sign_up")) &&
            <div className={cx(classes.main, scrollPosition > 60 ? classes.sticky : "")}>
                <NavTop currentLanguage={currentLanguage} setCurrentLanguage={setCurrentLanguage}/>
                <NavMid isAuth={isAuth} user={user} totalItemsCart={totalItemsCart} setIsOpenMobileCatalog={setIsOpenMobileCatalog} isOpenMobileCatalog={isOpenMobileCatalog} siteInfo={siteInfo}/>
                <NavBot categories={mainCategoriesWithChildren} setIsOpenMobileCatalog={setIsOpenMobileCatalog} isOpenMobileCatalog={isOpenMobileCatalog}/>
            </div>}
        </>
    )
}

let mapStateToProps = (state) => ({
    currentLanguage: state.common.currentLanguage,
    isAuth: state.user.isAuth,
    user: state.user.user,
    totalItemsCart: state.cart.totalCount,
    mainCategoriesWithChildren: state.categories.mainCategoriesWithChildren,
    siteInfo: state.common.siteInfo
})

export default connect(mapStateToProps, {
    setCurrentLanguage
})(Navbar)