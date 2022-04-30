import React from 'react'
import { connect } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { setCurrentLanguage } from '../../../Redux/commonReducer'
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

    return (
        <>
            {(!pathname.includes("admin") && !pathname.includes("/sign_up")) &&
            <div className={classes.main}>
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