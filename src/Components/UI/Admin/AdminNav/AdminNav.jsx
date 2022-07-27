import React from 'react'
import classes from './AdminNav.module.css'
import { FaUserCircle } from 'react-icons/fa';
import logo from '../../../../Assets/logo.png'
import { connect } from 'react-redux'
import { Badge, IconButton, Tooltip } from '@mui/material';
import { styled } from '@mui/material/styles';
import { MdFiberNew } from 'react-icons/md';
import { NavLink, useNavigate } from 'react-router-dom';
import AdminBurger from './AdminBurger/AdminBurger';

const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
      right: -3,
      top: 7,
      backgroundColor: "#E86589 !important",
      padding: '0 4px',
    },
}));

const AdminNav = (props) => {
    const { user, newOrdersCount } = props

    const navigate = useNavigate()

    const onOrdersClick = () => {
        if(newOrdersCount) {
            navigate(`/admin/orders`)
        }
    }

    return (
        <div className={classes.main}>
            <NavLink to={"/"} target="_blank">
                <img src={logo} alt="logo" className={classes.logo}/>
            </NavLink>
            <div className={classes.side}>
                <Tooltip title={newOrdersCount ? "Новые заказы" : "Пока что нет новых заказов"}>
                    <IconButton onClick={onOrdersClick}>
                        <StyledBadge badgeContent={newOrdersCount} color="secondary">
                            <MdFiberNew/>
                        </StyledBadge>
                    </IconButton>
                </Tooltip>
                <div className={classes.userContainer}>
                    <span>{user.email}</span>
                    <FaUserCircle/>
                </div>
                <div className={classes.burger}>
                    <AdminBurger email={user.email}/>
                </div>
            </div>
        </div>
    )
}

let mapStateToProps = (state) => ({
    user: state.user.user,
    newOrdersCount: state.orders.newTotal
})

export default connect(mapStateToProps, {})(AdminNav)