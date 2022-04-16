import React from 'react'
import { useTranslation } from 'react-i18next'
import { NavLink } from 'react-router-dom'
import classes from '../Content.module.css'

const PayTab = (props) => {
    const { t } = useTranslation()

    return (
        <div className={classes.body}>
            <div className={classes.type}>
                <h4>{t("modals.payment_guarantee.tabs.payment.two")}</h4>
                <ul>
                    <li>{t("modals.payment_guarantee.tabs.payment.three")} <NavLink to="/contacts">{t("modals.payment_guarantee.tabs.payment.three1")}</NavLink></li>
                    <li>{t("modals.payment_guarantee.tabs.payment.four")}</li>
                    <li>{t("modals.payment_guarantee.tabs.payment.five")}</li>
                </ul>
            </div>
            <div className={classes.type}>
                <h4>{t("modals.payment_guarantee.tabs.payment.six")}</h4>
                <ul>
                    <li>{t("modals.payment_guarantee.tabs.payment.seven")} <a rel="noreferrer" href="https://www.liqpay.ua/ru" target="_blank">LiqPay</a> {t("modals.payment_guarantee.tabs.payment.eight")}</li>
                </ul>
            </div>
            <div className={classes.status}>
                <h4>{t("modals.payment_guarantee.tabs.payment.nine")}</h4>
                <ol>
                    <li>{t("modals.payment_guarantee.tabs.payment.ten")}</li>
                    <li>{t("modals.payment_guarantee.tabs.payment.eleven")} <NavLink to="/delivery">{t("modals.payment_guarantee.tabs.payment.eleven1")}</NavLink> {t("modals.payment_guarantee.tabs.payment.eleven2")}</li>
                    <li>{t("modals.payment_guarantee.tabs.payment.twelve")}
                        <ul>
                            <li>{t("modals.payment_guarantee.tabs.payment.thirteen")}</li>
                            <li>{t("modals.payment_guarantee.tabs.payment.fourteen")}</li>
                        </ul>
                    </li>
                </ol>
            </div>
        </div>
    )
}

export default PayTab