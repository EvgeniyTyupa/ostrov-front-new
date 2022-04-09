import React from 'react'
import { Outlet } from 'react-router-dom'

const AdminPage = (props) => {
    return (
        <div>
            <Outlet/>
        </div>
    )
}

export default AdminPage