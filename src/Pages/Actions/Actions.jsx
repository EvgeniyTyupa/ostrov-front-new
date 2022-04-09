import React from 'react'
import { useTranslation } from 'react-i18next'
import ActionSmallItem from '../../Components/Common/Actions/ActionSmallItem/ActionSmallItem'
import Breadcrumbs from '../../Components/Common/Breadcrumbs/Breadcrumbs'
import MaxWidthContainer from '../../Components/UI/Container/MaxWidthContainer/MaxWidthContainer'
import PaddingContainer from '../../Components/UI/Container/PaddingContainer/PaddingContainer'
import classes from './Actions.module.css'

const Actions = (props) => {
    const { actions, currentLanguage } = props

    const { t } = useTranslation()

    return (
        <PaddingContainer className={classes.main}>
            <MaxWidthContainer className={classes.container}>
                <Breadcrumbs active={t("navigation.actions")}/>
                <div className={classes.wrapper}>
                    {actions.map(el => (
                        <ActionSmallItem key={el._id} action={el} currentLanguage={currentLanguage}/>
                    ))}
                </div>
            </MaxWidthContainer>
        </PaddingContainer>
    )
}

export default Actions