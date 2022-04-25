import React from 'react'
import { useTranslation } from 'react-i18next'
import { NavLink } from 'react-router-dom'
import ProfileLayout from '../../UI/ProfileLayout/ProfileLayout'
import classes from './MyOrders.module.css'

const MyOrders = (props) => {
    const { user, orders } = props

    const { t } = useTranslation()

    return (
        <ProfileLayout title={t("profile.menu.orders")}>
            <div className={classes.main}>
                <div className={classes.table}>
                    {orders.length === 0 &&
                        <div className={classes.emptyBlock}>
                            <p className={classes.empty}>{t("profile.order_empty")}</p>
                            <NavLink to="/">{t("profile.order_empty_link")}</NavLink>
                        </div>
                    }
                </div>
            </div>
        </ProfileLayout>
    )
}

export default MyOrders