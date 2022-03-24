import React from 'react'
import { useTranslation } from 'react-i18next'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import classes from './Breadcrumbs.module.css'

const Breadcrumbs = (props) => {
    const { currentlanguage, active, items } = props

    const { t } = useTranslation()

    return (
        <div className={classes.main}>
            <NavLink to="/">{t("navigation.breadcrumbMain")}</NavLink>
            <span>&gt;</span>
            {items.map(el => (
                <>
                    <NavLink to={el.href}>{el.title}</NavLink>
                    <span>&gt;</span>
                </>
            ))}
            <p>{active}</p>
        </div>
    )
}

let mapStateToProps = (state) => ({
    currentlanguage: state.common.currentlanguage
})

export default connect(mapStateToProps, null)(Breadcrumbs)