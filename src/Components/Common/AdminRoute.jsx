import React, { useEffect } from 'react'
import { connect } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { me } from '../../Redux/userReducer';
import Preloader from './Preloader/Preloader';

const AdminRoute = ({ isAuth, user, isStartData, me, isFetching, ...rest }) => {
    
    useEffect(() => {
        console.log(user)
    }, [user])

    useEffect(() => {
        !isStartData && me()
    }, [])

    return (isFetching && !user) ? <Preloader/> :
    (isAuth && user.adminLevel > 0 ) ? <Outlet/> : <Navigate to="/admin_login" />
}

let mapStateToProps = (state) => ({
    isFetching: state.common.isFetching,
    isStartData: state.user.isStartData,
    isAuth: state.user.isAuth,
    user: state.user.user
})

export default connect(mapStateToProps, {
    me
})(AdminRoute)