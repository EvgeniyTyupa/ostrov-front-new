import React, { useState } from 'react'
import { Divider, IconButton, Menu, MenuItem, Tooltip } from '@mui/material';
import { FiUser } from 'react-icons/fi';
import { MdLogout } from 'react-icons/md';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { setIsOpenLogin, setIsOpenRegister } from '../../../../../../Redux/commonReducer';
import classes from './AccountMenu.module.css'
import { logout } from '../../../../../../Redux/userReducer';
import { NavLink, useNavigate } from 'react-router-dom';

const AccountMenu = (props) => {
    const { 
        isAuth, 
        setIsOpenLogin, 
        setIsOpenRegister, 
        logout, 
        user 
    } = props

    const { t } = useTranslation()

    const navigate = useNavigate()

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleOpenLogin = () => {
        setIsOpenLogin(true)
    }

    const onClickRegister = () => {
        navigate(`/sign_up`)
    }

    return (
        <div className={classes.main}>
            <Tooltip title={t("common.userTooltip")}>
                <IconButton onClick={handleClick}>
                    <FiUser/>
                </IconButton>
            </Tooltip>
            <Menu
                anchorEl={anchorEl}
                onClose={handleClose}
                onClick={handleClose}
                open={open}
                transformOrigin={{ horizontal: 'center', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'center', vertical: 'bottom' }}
                PaperProps={{
                    elevation: 0,
                    sx: {
                      overflow: 'visible',
                      filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                      mt: 1.5,
                      '& .MuiAvatar-root': {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1,
                      },
                      '&:before': {
                        content: '""',
                        display: 'block',
                        position: 'absolute',
                        top: 0,
                        right: "45%",
                        width: 10,
                        height: 10,
                        bgcolor: 'background.paper',
                        transform: 'translateY(-50%) rotate(45deg)',
                        zIndex: 0,
                      },
                    },
                  }}
            >
                {isAuth ? 
                    <div>
                        <MenuItem>
                            <NavLink to="/profile" className={classes.menuItem}>{t("auth.profile")}</NavLink>
                        </MenuItem>
                        <Divider/>
                        <MenuItem onClick={logout} style={{ color: "#4B5EA2" }}>
                            <MdLogout/>
                            <p style={{ marginLeft: "8px" }} className={classes.menuItem}>{t("auth.logout")}</p>
                        </MenuItem>
                    </div> :
                    <div>
                        <MenuItem onClick={handleOpenLogin}>
                            <p className={classes.menuItem}>{t("auth.login")}</p>
                        </MenuItem>
                        <MenuItem onClick={onClickRegister}>
                            <p className={classes.menuItem}>{t("auth.register")}</p>
                        </MenuItem>
                    </div>
                }
            </Menu>
        </div>
    )
}

let mapStateToProps = (state) => ({
    isAuth: state.user.isAuth,
    user: state.user.user
})

export default connect(mapStateToProps, {
    setIsOpenLogin,
    setIsOpenRegister,
    logout
})(AccountMenu)