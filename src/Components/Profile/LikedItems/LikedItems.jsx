import React from 'react'
import { useTranslation } from 'react-i18next'
import { connect } from 'react-redux'
import AnimatedBlock from '../../Animation/AnimatedBlock/AnimatedBlock'
import ProfileLayout from '../../UI/ProfileLayout/ProfileLayout'
import LikedItem from './LikedItem/LikedItem'
import classes from './LikedItems.module.css'

const LikedItems = (props) => {
    const { user, currentLanguage } = props

    const { t } = useTranslation()

    return (
        <ProfileLayout title={t("profile.menu.liked")}>
            <AnimatedBlock className={classes.main} key="like">
                <div className={classes.wrapper}>
                    {user.liked_items.map(el => (
                        <LikedItem 
                            key={el._id} 
                            currentLanguage={currentLanguage}
                            item={el}
                        />
                    ))}
                    {user.liked_items.length === 0 &&
                        <p className={classes.empty}>{t("profile.liked_empty")}.</p>
                    }
                </div>
            </AnimatedBlock>
        </ProfileLayout>
    )
}

let mapStateToProps = (state) => ({
    user: state.user.user,
    currentLanguage: state.common.currentLanguage
})

export default connect(mapStateToProps, {

})(LikedItems)