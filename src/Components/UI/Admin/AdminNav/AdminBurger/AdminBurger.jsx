import { IconButton } from '@mui/material'
import React from 'react'
import classes from './AdminBurger.module.css'
import { HiMenu } from 'react-icons/hi';
import { Drawer } from '@mui/material';
import { useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAdminSidebar } from '../../../../../Hooks/useAdminSidebar';
import { logout } from '../../../../../Redux/userReducer';
import { connect } from 'react-redux';
import { Button } from '@mui/material';
import { Divider } from '@mui/material';
import { BiLogOut } from 'react-icons/bi';

const AdminBurger = (props) => {
    const { logout, email } = props

    const [isOpen, setIsOpen] = useState(false)

    const navigate = useNavigate()

    const items = useAdminSidebar()

    const handleOpen = () => {
        setIsOpen(!isOpen)
    }

    const handleLogout = () => {
        logout()
        navigate('/admin_login')
    }

    const anchor = 'right'

    return (
        <div>
            <div className={classes.burger}>
                <IconButton 
                    onClick={handleOpen}
                >
                    <HiMenu/>
                </IconButton>
            </div>
            <Drawer
                anchor={anchor} 
                open={isOpen} 
                onClose={handleOpen}
                classes={{ root: classes.root, paper: classes.paper }}
            >
                <div className={classes.header}>
                    <span>{email}</span>
                    <IconButton 
                        onClick={handleOpen}
                        className={classes.closeBut}
                    >
                        <AiOutlineClose/>
                    </IconButton>
                </div>
                <div className={classes.wrapper}>
                    {items.map(item => (
                        <Button key={item.title}>
                            <div>
                                <NavLink to={item.href} activeclassname={classes.active}>
                                    {item.icon}
                                    <span>{item.title}</span>
                                </NavLink>
                            </div>
                        </Button>
                    ))}
                    <Divider className={classes.divider}/>
                    <Button onClick={handleLogout} className={classes.exit}>
                        <BiLogOut/>
                        <span>Выход</span>
                    </Button>
                </div>
            </Drawer>
        </div>
    )
}

export default connect(null, {
    logout
})(AdminBurger)