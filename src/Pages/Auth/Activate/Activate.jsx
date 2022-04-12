import React from 'react'
import { useTranslation } from 'react-i18next'
import { NavLink } from 'react-router-dom'
import MaxWidthContainer from '../../../Components/UI/Container/MaxWidthContainer/MaxWidthContainer'
import PaddingContainer from '../../../Components/UI/Container/PaddingContainer/PaddingContainer'
import classes from './Activate.module.css'

const Activate = (props) => {
    const { t } = useTranslation()

    return (
        <PaddingContainer>
            <MaxWidthContainer className={classes.container}>
                <p>{t("auth.activate_done")}</p>
                <NavLink to="/">{t("auth.home")}</NavLink>
            </MaxWidthContainer>
        </PaddingContainer>
    )
}

export default Activate