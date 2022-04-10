import { Button } from '@mui/material'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { connect } from 'react-redux'
import classes from './AccountInfo.module.css'
import AccountInfoForm from './AccountInfoForm/AccountInfoForm'

const AccountInfo = (props) => {
    const { user, currentLanguage } = props

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
                        {user.warehouse ?
                            (currentLanguage === "ru" ? 
                                <p>{user.warehouse.CityDescriptionRu}, {user.warehouse.DescriptionRu}</p>
                                : <p>{user.warehouse.CityDescription}, {user.warehouse.Description}</p>
                            ) :
                            <p>{user.city && user.city.MainDescription}</p>
                        }
                    </div>
                </div>
            }
            {!isEdit && <Button onClick={handleEdit} className={classes.editBut}>{t("profile.account.edit")}</Button>}
        </div>
    )
}

let mapStateToProps = (state) => ({
    user: state.user.user,
    currentLanguage: state.common.currentLanguage
})

export default connect(mapStateToProps, {})(AccountInfo)