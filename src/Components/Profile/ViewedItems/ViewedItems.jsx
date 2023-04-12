import React from 'react'
import { useTranslation } from 'react-i18next'
import { connect } from 'react-redux'
import AnimatedBlock from '../../Animation/AnimatedBlock/AnimatedBlock'
import ProfileLayout from '../../UI/ProfileLayout/ProfileLayout'
import ViewedItem from './ViewedItem/ViewedItem'
import classes from './ViewedItems.module.css'

const ViewedItems = (props) => {
    const { currentLanguage, viewedItems } = props

    const { t } = useTranslation()

    return (
        <ProfileLayout title={t("profile.menu.viewed")}>
            <AnimatedBlock className={classes.main}>
                <div className={classes.wrapper}>
                    {viewedItems ? viewedItems.reverse().map(el => (
                        <ViewedItem
                            key={el._id}
                            currentLanguage={currentLanguage}
                            item={el}
                        />
                    )) :
                        <p className={classes.empty}>{t("profile.viewed_empty")}</p>
                    }
                </div>
            </AnimatedBlock>
        </ProfileLayout>
    )
}

let mapStateToProps = (state) => ({
    currentLanguage: state.common.currentLanguage,
    viewedItems: state.items.viewedItems
})

export default connect(mapStateToProps, {})(ViewedItems)