import React from 'react'
import { connect } from 'react-redux'
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
        user
    } = props

    return (
        <div className={classes.main}>
            <NavTop currentLanguage={currentLanguage} setCurrentLanguage={setCurrentLanguage}/>
            <NavMid isAuth={isAuth} user={user}/>
            <NavBot/>
        </div>
    )
}

let mapStateToProps = (state) => ({
    currentLanguage: state.common.currentLanguage,
    isAuth: state.user.isAuth,
    user: state.user.user
})

export default connect(mapStateToProps, {
    setCurrentLanguage
})(Navbar)