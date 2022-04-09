import { Button } from "@mui/material"
import React, { useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { useTranslation } from "react-i18next"
import { connect } from "react-redux"
import { getCities, getWarehouses } from "../../../../../Redux/commonReducer"
import { cx } from "../../../../../Utils/classnames"
import AddressAutocomplete from "../../../../UI/Form/AddressAutocomplete"
import AdminInput from "../../../../UI/Form/AdminInput"
import Field from "../../../../UI/Form/Field/Field"
import classes from "./AccountInfoForm.module.css"

const AccountInfoForm = (props) => {
    const { 
        onClose, 
        cities, 
        npWarehouses,
        getCities
    } = props

    const { t } = useTranslation()

    const { handleSubmit, control, reset, setValue } = useForm()

    const onSubmit = (data) => {
        console.log(data)
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={classes.main}>
            <div className={classes.row}>
                <Field className={classes.field}>
                    <label>{t("profile.account.form.first_name")}</label>
                    <Controller
                        name="first_name"
                        control={control}
                        defaultValue=""
                        render={({ field: { onChange, value }, fieldState: { error } }) => (
                            <AdminInput
                                onChange={onChange}
                                value={value}
                            />
                        )}
                    />
                </Field>
                <Field className={classes.field}>
                    <label>{t("profile.account.form.last_name")}</label>
                    <Controller
                        name="last_name"
                        control={control}
                        defaultValue=""
                        render={({ field: { onChange, value }, fieldState: { error } }) => (
                            <AdminInput
                                onChange={onChange}
                                value={value}
                            />
                        )}
                    />
                </Field>
            </div>
            <div className={classes.row}>
                <Field className={classes.field}>
                    <label>{t("profile.account.form.email")}</label>
                    <Controller
                        name="email"
                        control={control}
                        defaultValue=""
                        render={({ field: { onChange, value }, fieldState: { error } }) => (
                            <AdminInput
                                onChange={onChange}
                                value={value}
                            />
                        )}
                    />
                </Field>
                <Field className={cx(classes.field, classes.phone)}>
                    <label>{t("profile.account.form.phone")}</label>
                    <Controller
                        name="phone"
                        control={control}
                        defaultValue=""
                        render={({ field: { onChange, value }, fieldState: { error } }) => (
                            <AdminInput
                                onChange={onChange}
                                value={value}
                                regex="number"
                                startAdornment={true}
                                startAdornmentIcon={<span>+380</span>}
                            />
                        )}
                    />
                </Field>
            </div>
            
                <Field className={classes.field}>
                    <label>{t("profile.account.form.city")}</label>
                    <Controller
                        name="city"
                        control={control}
                        defaultValue={[]}
                        render={({ field: { onChange, value }, fieldState: { error } }) => (
                            <AddressAutocomplete
                                value={value}
                                onChange={onChange}
                                items={cities}
                                setValue={setValue}
                                name="city"
                                onSearch={getCities}
                            />
                        )}
                    />
                </Field>
                <Field className={cx(classes.field, classes.phone)}>
                    <label>{t("profile.account.form.phone")}</label>
                    <Controller
                        name="warehouse"
                        control={control}
                        defaultValue=""
                        render={({ field: { onChange, value }, fieldState: { error } }) => (
                            <AddressAutocomplete
                                value={value}
                                onChange={onChange}
                                items={npWarehouses}
                                setValue={setValue}
                                name="warehouse"
                                onSearch={getWarehouses}
                            />
                        )}
                    />
                </Field>
            <div className={classes.buttons}>
                <Button onClick={onClose} className={classes.cancel}>{t("profile.account.cancel")}</Button>
                <Button className={classes.save} type="submit">{t("profile.account.submit")}</Button>
            </div>
        </form>
    )
}

let mapStateToProps = (state) => ({
    user: state.user.user,
    cities: state.common.searchingCities,
    npWarehouses: state.common.npWarehouses
})

export default connect(mapStateToProps, {
    getCities
})(AccountInfoForm)