import React from 'react'
import AdminNav from '../AdminNav/AdminNav'
import AdminSidebar from '../AdminSidebar/AdminSidebar'
import classes from './AdminLayout.module.css'

const AdminLayout = (props) => {
    const { children } = props

    return (
        <div className={classes.main}>
            <AdminNav/>
            <div className={classes.body}>
                <AdminSidebar/>
                <div className={classes.content}>
                    {children}
                </div>
            </div>
        </div>
    )
}

export default AdminLayout