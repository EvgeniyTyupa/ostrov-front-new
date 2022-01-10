import React from 'react'
import { Outlet } from 'react-router-dom'
import classes from './Admin.module.css'

const AdminPage = (props) => {
    return (
        <div>
            <Outlet/>
        </div>
    )
}

export default AdminPage