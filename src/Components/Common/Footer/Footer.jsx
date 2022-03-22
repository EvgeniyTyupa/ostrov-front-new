import React from 'react'
import FootBot from './FootBot/FootBot'
import classes from './Footer.module.css'
import FootTop from './FootTop/FootTop'

const Footer = (props) => {
    return (
        <div className={classes.main}>
            <FootTop/>
            <FootBot/>
        </div>
    )
}

export default Footer