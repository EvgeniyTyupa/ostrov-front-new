import React from 'react'
import { useLocation } from 'react-router-dom'
import FootBot from './FootBot/FootBot'
import classes from './Footer.module.css'
import FootTop from './FootTop/FootTop'

const Footer = (props) => {
    const { pathname } = useLocation()

    return (
        <>
            {(!pathname.includes("config_toys") && !pathname.includes("/sign_up")) &&
                <div className={classes.main}>
                    <FootTop/>
                    <FootBot/>
                </div>
            }
        </>
    )
}

export default Footer