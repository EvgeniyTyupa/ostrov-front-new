import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'
import Preloader from '../../Components/Common/Preloader/Preloader'
import { me } from '../../Redux/userReducer'

const ProfilePage = (props) => {
    const { 
        user, 
        me, 
        isAuth,
        isReceiveAuthStatus
    } = props

    useEffect(() => {
        if(!user) {
            me()
        }
    }, [])

    return !isReceiveAuthStatus ? <Preloader/> :
    isAuth ? <Outlet/> : <Navigate to="/" />
}

let mapStateToProps = (state) => ({
    user: state.user.user,
    isAuth: state.user.isAuth,
    isReceiveAuthStatus: state.user.isReceiveAuthStatus
})

export default connect(mapStateToProps, {
    me
})(ProfilePage)