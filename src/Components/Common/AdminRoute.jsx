import React, { useEffect } from 'react'
import { connect } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { logout, me } from '../../Redux/userReducer';
import Preloader from './Preloader/Preloader';

const AdminRoute = ({ isAuth, user, isStartData, me, isFetching, logout, ...rest }) => {

    useEffect(() => {
        !isStartData && me()
    }, [])

    useEffect(() => {
        if(user && user.adminLevel < 1) {
            logout()
        }
    }, [user])

    return (isFetching && !user) ? <Preloader/> :
    (isAuth && user && user.adminLevel > 0 ) ? <Outlet/> : <Navigate to="/config_toys_login" />
}

let mapStateToProps = (state) => ({
    isFetching: state.common.isFetching,
    isStartData: state.user.isStartData,
    isAuth: state.user.isAuth,
    user: state.user.user
})

export default connect(mapStateToProps, {
    me,
    logout
})(AdminRoute)