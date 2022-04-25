import React from 'react'
import { useTranslation } from 'react-i18next'
import AnimatedBlock from '../../Components/Animation/AnimatedBlock/AnimatedBlock'
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
                <AnimatedBlock className={classes.wrapper}>
                    {actions.map(el => (
                        <ActionSmallItem key={el._id} action={el} currentLanguage={currentLanguage}/>
                    ))}
                </AnimatedBlock>
            </MaxWidthContainer>
        </PaddingContainer>
    )
}

export default Actions