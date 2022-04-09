import React from 'react'
import { useTranslation } from 'react-i18next'
import ProfileLayout from '../../UI/ProfileLayout/ProfileLayout'
import classes from './Settings.module.css'

const Settings = (props) => {
    const { t } = useTranslation()

    return (
        <ProfileLayout title={t("profile.menu.settings")}>
            
        </ProfileLayout>
    )
}

export default Settings