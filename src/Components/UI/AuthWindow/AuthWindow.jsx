import React from 'react'
import { useTranslation } from 'react-i18next'
import { NavLink } from 'react-router-dom'
import classes from './AuthWindow.module.css'

const AuthWindow = (props) => {
    const { title, children, type = "login" } = props
    
    const { t } = useTranslation()

    return (
        <div className={classes.main}>
            <h2>{title}</h2>
            {children}
            {/* {type === "login" && <NavLink to="/forgot_pass">{t("form.forgot_pass")}</NavLink>} */}
        </div>
    )
}

export default AuthWindow