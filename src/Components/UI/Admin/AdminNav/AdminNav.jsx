import React from 'react'
import classes from './AdminNav.module.css'

import logo from '../../../../Assets/logo.png'

const AdminNav = () => {
    return (
        <div className={classes.main}>
            <img src={logo} alt="logo" className={classes.logo}/>
            <div>
                <span>Name</span>
            </div>
        </div>
    )
}

export default AdminNav