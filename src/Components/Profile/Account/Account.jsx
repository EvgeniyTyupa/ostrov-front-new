import React from 'react'
import { useTranslation } from 'react-i18next'
import { NavLink } from 'react-router-dom'
import AnimatedBlock from '../../Animation/AnimatedBlock/AnimatedBlock'
import ProfileLayout from '../../UI/ProfileLayout/ProfileLayout'
import classes from './Account.module.css'
import AccountInfo from './AccountInfo/AccountInfo'

const Account = () => {
    const { t } = useTranslation()

    return (
        <ProfileLayout title={t("profile.menu.account")}>
            <AnimatedBlock key="account">
                <span className={classes.recomendation}>{t("profile.account.recomendation")}</span>
                <AccountInfo/>
                <div className={classes.info}>
                    <div className={classes.block}>
                        <h5>{t("profile.account.oneBlockInfo.title")}</h5>
                        <p>{t("profile.account.oneBlockInfo.text")}</p>
                        <NavLink to="/">{t("profile.account.oneBlockInfo.linkText")}</NavLink>
                    </div>
                    <div className={classes.block}>
                        <h5>{t("profile.account.twoBlockInfo.title")}</h5>
                        <p>{t("profile.account.twoBlockInfo.text")}</p>
                        <NavLink to="/">{t("profile.account.twoBlockInfo.linkText")}</NavLink>
                    </div>
                    <div className={classes.block}>
                        <h5>{t("profile.account.threeBlockInfo.title")}</h5>
                        <p>{t("profile.account.threeBlockInfo.text")}</p>
                        <NavLink to="/">{t("profile.account.threeBlockInfo.linkText")}</NavLink>
                    </div>
                </div>
            </AnimatedBlock>
        </ProfileLayout>
    )
}

export default Account