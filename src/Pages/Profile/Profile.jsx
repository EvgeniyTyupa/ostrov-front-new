import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'
import Preloader from '../../Components/Common/Preloader/Preloader'
import { me } from '../../Redux/userReducer'

const ProfilePage = (props) => {
    const { isFetching, user, me } = props

    useEffect(() => {
        if(!user) {
            me()
        }
    }, [])

    return (isFetching && !user) ? <Preloader/> :
    user ? <Outlet/> : <Navigate to="/" />
}

let mapStateToProps = (state) => ({
    isFetching: state.common.isFetching,
    user: state.user.user
})

export default connect(mapStateToProps, {
    me
})(ProfilePage)