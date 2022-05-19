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
        mainCategoriesWithChildren
    } = props

    const { pathname } = useLocation()

    const [scrollPosition, setScrollPosition] = useState(0);
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
            {(!pathname.includes("admin") && !pathname.includes("/sign_up")) &&
            <div className={cx(classes.main, scrollPosition > 60 ? classes.sticky : "")}>
                <NavTop currentLanguage={currentLanguage} setCurrentLanguage={setCurrentLanguage}/>
                <NavMid isAuth={isAuth} user={user} totalItemsCart={totalItemsCart}/>
                <NavBot categories={mainCategoriesWithChildren}/>
            </div>}
        </>
    )
}

let mapStateToProps = (state) => ({
    currentLanguage: state.common.currentLanguage,
    isAuth: state.user.isAuth,
    user: state.user.user,
    totalItemsCart: state.cart.totalCount,
    mainCategoriesWithChildren: state.categories.mainCategoriesWithChildren

})

export default connect(mapStateToProps, {
    setCurrentLanguage
})(Navbar)