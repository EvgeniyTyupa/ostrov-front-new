import { Button } from "@mui/material"
import React, { useEffect, useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { useTranslation } from "react-i18next"
import { connect } from "react-redux"
import { getCities, getWarehouses } from "../../../../../Redux/commonReducer"
import { updateProfile } from "../../../../../Redux/userReducer"
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
        getCities,
        getWarehouses,
        user,
        updateProfile
    } = props

    const { t } = useTranslation()

    const { handleSubmit, control, reset, setValue } = useForm()

    const [currentCity, setCurrentCity] = useState(user.city || null)

    const onSubmit = (data) => {
        data.phone = data.phone ? "+380" + data.phone : ''
        data.city = {
            MainDescription: data.city.MainDescription,
            Present: data.city.Present
        }
        data.warehouse = {
            Description: data.warehouse.Description,
            DescriptionRu: data.warehouse.DescriptionRu,
            CityDescription: data.warehouse.CityDescription,
            CityDescriptionRu: data.warehouse.CityDescriptionRu
        }

        updateProfile(user._id, data)
        onClose()
    }

    useEffect(() => {
        reset({
            ...user,
            first_name: user.first_name || "",
            last_name: user.last_name || "",
            email: user.email || "",
            phone: user.phone ? user.phone.substring(4) : "",
            city: user.city || null,
            warehouse: user.warehouse || null
        })
    }, [])

    useEffect(() => {
        if(currentCity){
            getWarehouses(currentCity.MainDescription, "")
        }
    }, [currentCity])

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
                    defaultValue={null}
                    render={({ field: { onChange, value }, fieldState: { error } }) => (
                        <AddressAutocomplete
                            value={value}
                            onChange={onChange}
                            items={cities}
                            setValue={setValue}
                            name="city"
                            disabled={false}
                            onSearch={getCities}
                            setCurrentValue={setCurrentCity}
                            placeholder={t("profile.account.form.city")}
                        />
                    )}
                />
            </Field>
            <Field className={cx(classes.field, classes.lastField)}>
                <label>{t("profile.account.form.postNumber")}</label>
                <Controller
                    name="warehouse"
                    control={control}
                    defaultValue={null}
                    render={({ field: { onChange, value }, fieldState: { error } }) => (
                        <AddressAutocomplete
                            value={value}
                            onChange={onChange}
                            items={npWarehouses}
                            setValue={setValue}
                            name="warehouse"
                            disabled={currentCity ? false : true}
                            onSearch={getWarehouses}
                            city={currentCity}
                            placeholder={t("profile.account.form.number")}
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
    getCities,
    getWarehouses,
    updateProfile
})(AccountInfoForm)