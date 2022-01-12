import React, { useEffect } from 'react'
import classes from './AdminLogin.module.css'

import AdminInput from '../../../Components/UI/Form/AdminInput'
import InputPassword from '../../../Components/UI/Form/InputPassword'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import { useNavigate } from 'react-router-dom';

import { useTranslation } from 'react-i18next'
import { Controller, useForm } from 'react-hook-form'
import AuthWindow from '../../../Components/UI/AuthWindow/AuthWindow'
import Field from '../../../Components/UI/Form/Field/Field'
import CustomButton from '../../../Components/UI/Button/CustomButton';
import { connect } from 'react-redux';
import { login } from '../../../Redux/userReducer';
import Error from '../../../Components/UI/Form/Error/Error';
import Preloader from '../../../Components/Common/Preloader/Preloader';

const AdminLogin = (props) => {
    const { 
        isFetching,
        serverError,
        login,
        isAuth
    } = props

    let navigate = useNavigate();

    const { handleSubmit, control, reset } = useForm()

    const { t } = useTranslation()

    const onSubmit = (data) => {
        data.email = data.email.toLowerCase()

        login(data)

        reset({
            email: "",
            password: ""
        })
    }

    useEffect(() => {
        if(isAuth) {
            localStorage.usertoken && navigate('/admin')
        }
    }, [isAuth])

    return (
        <div className={classes.main}>
            {isFetching && <Preloader/>}
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
                    {serverError &&
                    <div className={classes.errorBlock}>
                        <Error text={serverError}/>
                    </div>}
                    <CustomButton type="submit" className={classes.submit}>Login</CustomButton>
                </form>
            </AuthWindow>
        </div>
    )
}

let mapStateToProps = (state) => ({
    isFetching: state.common.isFetching,
    serverError: state.common.serverError,
    isAuth: state.user.isAuth
})

export default connect(mapStateToProps, {
    login
})(AdminLogin)