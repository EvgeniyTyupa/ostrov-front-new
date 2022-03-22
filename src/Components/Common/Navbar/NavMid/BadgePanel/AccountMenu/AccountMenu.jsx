import React, { useState } from 'react'
import { IconButton, Menu, MenuItem, Tooltip } from '@mui/material';
import { FiUser } from 'react-icons/fi';
import { useTranslation } from 'react-i18next';

const AccountMenu = (props) => {
    const { t } = useTranslation()

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <React.Fragment>
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
                <MenuItem>
                    
                    Logout
                </MenuItem>
            </Menu>
        </React.Fragment>
    )
}

export default AccountMenu