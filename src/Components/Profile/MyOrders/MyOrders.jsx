import React from 'react'
import { useTranslation } from 'react-i18next'
import { connect } from 'react-redux'
import ProfileLayout from '../../UI/ProfileLayout/ProfileLayout'
import classes from './MyOrders.module.css'

const MyOrders = (props) => {
    const { user } = props

    const { t } = useTranslation()

    return (
        <ProfileLayout title={t("profile.menu.orders")}>
            
        </ProfileLayout>
    )
}

let mapStateToProps = (state) => ({
    user: state.user.user
})

export default connect(mapStateToProps, {})(MyOrders)