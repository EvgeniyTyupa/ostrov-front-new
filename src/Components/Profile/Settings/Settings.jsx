import { Button } from '@mui/material'
import React, { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { connect } from 'react-redux'
import { setServerError } from '../../../Redux/commonReducer'
import { changePassword } from '../../../Redux/userReducer'
import Preloader from '../../Common/Preloader/Preloader'
import Error from '../../UI/Form/Error/Error'
import Field from '../../UI/Form/Field/Field'
import InputPassword from '../../UI/Form/InputPassword'
import ProfileLayout from '../../UI/ProfileLayout/ProfileLayout'
import ServerResponse from '../../UI/ServerResponse/ServerResponse'
import classes from './Settings.module.css'

const Settings = (props) => {
    const { 
        changePassword, 
        user,
        serverError,
        setServerError,
        isFetching,
        serverResponse
    } = props

    const { t } = useTranslation()

    const { handleSubmit, control, watch, reset } = useForm()

    const onSubmit = (data) => {
        changePassword(user._id, data)
    }

    useEffect(() => {
        if(serverResponse) {
            reset({
                old_password: "",
                new_password: "",
                match_password: ""
            })
        }
    }, [serverResponse])

    return (
        <ProfileLayout title={t("profile.menu.settings")}>
            {isFetching && <Preloader/>}
            {serverResponse && <ServerResponse/>}
            <form onSubmit={handleSubmit(onSubmit)} className={classes.main}>
                <Field className={classes.field}>
                    <label>{t("profile.settings.old_password")}</label>
                    <Controller
                        name="old_password"
                        control={control}
                        rules={{ 
                            required: {
                                value: true,
                                message: t("errors.required")
                            }
                        }}
                        defaultValue=""
                        render={({ field: { onChange, value }, fieldState: { error } }) => (
                            <InputPassword
                                error={error}
                                onChange={(e) => {
                                    setServerError(null)
                                    onChange(e.target.value)
                                }}
                                value={value}  
                                label={null}
                            />
                        )}
                    />
                </Field>
                {serverError && <Error text={serverError}/>}
                <Field className={classes.field}>
                    <label>{t("profile.settings.new_password")}</label>
                    <Controller
                        name="new_password"
                        control={control}
                        defaultValue=""
                        rules={{ 
                            required: {
                                value: true,
                                message: t("errors.required")
                            }
                        }}
                        render={({ field: { onChange, value }, fieldState: { error } }) => (
                            <InputPassword
                                error={error}
                                onChange={onChange}
                                value={value}  
                                label={null}
                            />
                        )}
                    />
                </Field>
                <Field className={classes.field}>
                    <label>{t("profile.settings.match_password")}</label>
                    <Controller
                        name="match_password"
                        control={control}
                        rules={{ 
                            required: {
                                value: true,
                                message: t("errors.required")
                            },
                            validate: {
                                value: (value) => value === watch('new_password') || t("errors.notMatch")
                            }
                        }}
                        defaultValue=""
                        render={({ field: { onChange, value }, fieldState: { error } }) => (
                            <InputPassword
                                error={error}
                                onChange={onChange}
                                value={value}  
                                label={null}
                            />
                        )}
                    />
                </Field>
                <Button 
                    className={classes.submitBut} 
                    type="submit"
                >
                    {t("profile.settings.submit")}
                </Button>
            </form>
        </ProfileLayout>
    )
}

let mapStateToProps = (state) => ({
    user: state.user.user,
    serverError: state.common.serverError,
    isFetching: state.common.isFetching,
    serverResponse: state.common.serverResponse
})

export default connect(mapStateToProps, {
    changePassword,
    setServerError
})(Settings)