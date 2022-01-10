import React from 'react'
import classes from './AdminLogin.module.css'

import AdminInput from '../../../Components/UI/Form/AdminInput'
import InputPassword from '../../../Components/UI/Form/InputPassword'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import { useTranslation } from 'react-i18next'
import { Controller, useForm } from 'react-hook-form'
import AuthWindow from '../../../Components/UI/AuthWindow/AuthWindow'
import Field from '../../../Components/UI/Form/Field/Field'
import CustomButton from '../../../Components/UI/Button/CustomButton';


const AdminLogin = () => {
    const { handleSubmit, control, reset } = useForm()

    const { t } = useTranslation()

    const onSubmit = (data) => {
        data.email = data.email.toLowerCase()

        reset({
            email: "",
            password: ""
        })
    }

    return (
        <div className={classes.main}>
            <AuthWindow title="Admin Login">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Field>
                        <Controller
                            name="email"
                            control={control}
                            defaultValue=""
                            rules={{ required: t("errors.required") }}
                            render={({ field: { onChange, value }, fieldState: { error } }) => (
                                <AdminInput
                                    onChange={onChange}
                                    value={value}
                                    error={error}
                                    label={"Email"}
                                    startAdornment={true}
                                    startAdornmentIcon={<AccountCircleIcon/>}
                                />
                            )}
                        />
                    </Field>
                    <Field>
                        <Controller
                            name="password"
                            control={control}
                            defaultValue=""
                            rules={{ required: t("errors.required") }}
                            render={({ field: { onChange, value }, fieldState: { error } }) => (
                                <InputPassword
                                    onChange={onChange}
                                    value={value}
                                    error={error}
                                />
                            )}
                        />
                    </Field>
                    <CustomButton type="submit" className={classes.submit}>Login</CustomButton>
                </form>
            </AuthWindow>
        </div>
    )
}

export default AdminLogin