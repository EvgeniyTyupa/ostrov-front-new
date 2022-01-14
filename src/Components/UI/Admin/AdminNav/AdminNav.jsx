import React from 'react'
import classes from './AdminNav.module.css'
import { FaUserCircle } from 'react-icons/fa';
import logo from '../../../../Assets/logo.png'
import { connect } from 'react-redux'

const AdminNav = (props) => {
    const { user } = props

    return (
        <div className={classes.main}>
            <img src={logo} alt="logo" className={classes.logo}/>
            <div className={classes.userContainer}>
                <span>{user.email}</span>
                <FaUserCircle/>
            </div>
        </div>
    )
}

let mapStateToProps = (state) => ({
    user: state.user.user
})

export default connect(mapStateToProps, {})(AdminNav)