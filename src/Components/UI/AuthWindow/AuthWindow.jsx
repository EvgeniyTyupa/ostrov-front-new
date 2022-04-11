import React from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import classes from './AuthWindow.module.css'

const AuthWindow = (props) => {
    const { title, children, type = "login" } = props
    
    const { t } = useTranslation()

    return (
        <div className={classes.main}>
            <h2>{title}</h2>
            {children}
            {type === "login" && <Link to="/reset_password">{t("form.forgot_pass")}</Link>}
        </div>
    )
}

export default AuthWindow