import { Button } from '@mui/material'
import React from 'react'
import classes from './ProfileMobileMenu.module.css'
import { RiMenuFoldFill } from "react-icons/ri"
import { Drawer } from '@mui/material'
import { useState } from 'react'
import { IconButton } from '@mui/material'
import { AiOutlineClose } from "react-icons/ai"
import { useProfileMenu } from '../../../../Hooks/useProfileMenu'
import { NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Divider } from '@mui/material'

const ProfileMobileMenu = (props) => {
    const { logout } = props

    const { t } = useTranslation()

    const [isOpen, setIsOpen] = useState(false)

    const handleOpen = () => {
        setIsOpen(!isOpen)
    }

    const anchor = 'right'

    const menuItems = useProfileMenu()

    return (
        <div>
            <Button onClick={handleOpen} className={classes.menuButt}>
                <span>Меню</span>
                <RiMenuFoldFill/>
            </Button>
            <Drawer
                anchor={anchor} 
                open={isOpen} 
                onClose={handleOpen}
                classes={{ root: classes.root, paper: classes.paper }}
            >
                <div className={classes.header}>
                    <IconButton 
                        onClick={handleOpen}
                        className={classes.closeBut}
                    >
                        <AiOutlineClose/>
                    </IconButton>
                </div>
                <div className={classes.links}>
                    {menuItems.map(el => (
                        <NavLink 
                            key={el.href}
                            className={({isActive}) => (isActive ? classes.active : '')} 
                            to={el.href}
                            end
                        >
                            {el.text}
                        </NavLink>
                    ))}
                    <Divider className={classes.divider}/>
                    <Button className={classes.exit} onClick={() => logout()}>{t("auth.logout")}</Button>
                </div>
            </Drawer>
        </div>
    )
}

export default ProfileMobileMenu