import { Button } from '@mui/material'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { connect } from 'react-redux'
import classes from './AccountInfo.module.css'
import AccountInfoForm from './AccountInfoForm/AccountInfoForm'

const AccountInfo = (props) => {
    const { user } = props

    const { t } = useTranslation()

    const [isEdit, setIsEdit] = useState(false)

    const handleEdit = () => {
        setIsEdit(!isEdit)
    }

    return (
        <div className={classes.main}>
            {isEdit ? <AccountInfoForm onClose={handleEdit}/> :
                <div className={classes.info}>
                    <div className={classes.field}>
                        <label>{t("profile.account.name")}</label>
                        <p>{user.first_name} {user.last_name}</p>
                    </div>
                    <div className={classes.field}>
                        <label>{t("profile.account.email")}</label>
                        <p>{user.email}</p>
                    </div>
                    <div className={classes.field}>
                        <label>{t("profile.account.phone")}</label>
                        <p>{user.phone}</p>
                    </div>
                    <div className={classes.field}>
                        <label>{t("profile.account.address")}</label>
                        <p>{user.address}</p>
                    </div>
                </div>
            }
            {!isEdit && <Button onClick={handleEdit} className={classes.editBut}>{t("profile.account.edit")}</Button>}
        </div>
    )
}

let mapStateToProps = (state) => ({
    user: state.user.user
})

export default connect(mapStateToProps, {})(AccountInfo)