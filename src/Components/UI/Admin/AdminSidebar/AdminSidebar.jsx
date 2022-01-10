import React from 'react'
import { NavLink } from 'react-router-dom'
import { useAdminSidebar } from '../../../../Hooks/useAdminSidebar'
import classes from './AdminSidebar.module.css'
import Styled from 'styled-components'
import { useState } from 'react'
import { Button } from '@mui/material'
import { BiCollapse, BiExitFullscreen } from 'react-icons/bi';

const AdminSidebar = () => {
    const items = useAdminSidebar()

    const [isCollapse, setIsCollapse] = useState(false)

    const handleCollapse = () => {
        setIsCollapse(!isCollapse)
    }

    return (
        <Main className={classes.main} isCollapse={isCollapse}>
            {items.map(item => (
                <Button key={item.title}>
                    <div>
                        <NavLink to={item.href} activeclassname={classes.active}>
                            {item.icon}
                            {!isCollapse && <span>{item.title}</span>}
                        </NavLink>
                    </div>
                </Button>
            ))}
            <Button onClick={handleCollapse}>
                {!isCollapse && (
                    <div>
                        <BiCollapse/>
                        <span>Свернуть</span>
                    </div>
                )}
                {isCollapse && <BiExitFullscreen/>}
            </Button>
        </Main>
    )
}

const Main = Styled.div`
    width: ${({ isCollapse }) => !isCollapse ? "200px" : "70px"};
    transition-duration: .3s;

    div {
        padding: ${({ isCollapse }) => isCollapse ? "0" : "0 20px"};
        box-sizing: border-box;
        display: flex;
        align-items: center;
        width: 100%;
        height: 100%;
    }
    a {
        justify-content: ${({ isCollapse }) => isCollapse ? "center" : "flex-start"};
    }
    button {
        justify-content: ${({ isCollapse }) => isCollapse ? "center" : "flex-start"};
    }
`

export default AdminSidebar