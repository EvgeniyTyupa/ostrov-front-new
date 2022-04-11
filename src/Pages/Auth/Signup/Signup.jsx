import React, { useEffect } from 'react'
import classes from './Signup.module.css'
import logo from '../../../Assets/logo.png'
import { Controller, useForm } from 'react-hook-form'
import AdminInput from '../../../Components/UI/Form/AdminInput'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useTranslation } from 'react-i18next'
import AuthWindow from '../../../Components/UI/AuthWindow/AuthWindow'
import { NavLink, useNavigate } from 'react-router-dom'
import InputPassword from '../../../Components/UI/Form/InputPassword'
import { Button } from '@mui/material'

import boy from '../../../Assets/boy.svg'
import girl from '../../../Assets/girl.svg'
import { connect } from 'react-redux'
import { register } from '../../../Redux/userReducer'
import Preloader from '../../../Components/Common/Preloader/Preloader'
import ServerResponse from '../../../Components/UI/ServerResponse/ServerResponse'


const Signup = (props) => {
    const { isFetching, register, serverError, isRegisterDone } = props

    const { handleSubmit, control, watch } = useForm()

    const { t } = useTranslation()

    const navigate = useNavigate()

    const onSubmit = (data) => {
        register(data)
    }

    useEffect(() => {
        if(isRegisterDone){

        }
    }, [isRegisterDone])

    return (
        <div className={classes.container}>
            {isFetching && <Preloader/>}
            <div className={classes.main}>
                <NavLink to="/" className={classes.logo}>
                    <img src={logo} alt="logo" />
                </NavLink>
                <AuthWindow title={t("auth.register")} type="register">
                    <img src={girl} alt="girl" className={classes.girl}/>
                    <img src={boy} alt="boy" className={classes.boy}/>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Controller
                            name="email"
                            control={control}
                            defaultValue=""
                            rules={{ 
                                required: {
                                    value: true,
                                    message: t("errors.required")
                                },
                                pattern: {
                                    value: /^[A-Za-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}/,
                                    message: t("errors.email")
                                }
                            }}
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
                        {serverError && <ServerResponse/>}
                        <Controller
                            name="password"
                            control={control}
                            defaultValue=""
                            rules={{ 
                                required: {
                                    value: true,
                                    message: t("errors.required")
                                },
                                validate: {
                                    value: (value) => value.length < 6 || t("errors.notMatch")
                                }
                            }}
                            render={({ field: { onChange, value }, fieldState: { error } }) => (
                                <InputPassword
                                    error={error}
                                    onChange={onChange}
                                    value={value}  
                                    label={t("auth.password")}
                                />
                            )}
                        />
                        <Controller
                            name="match_password"
                            control={control}
                            rules={{ 
                                required: {
                                    value: true,
                                    message: t("errors.required")
                                },
                                validate: {
                                    value: (value) => value === watch('password') || t("errors.notMatch")
                                }
                            }}
                            defaultValue=""
                            render={({ field: { onChange, value }, fieldState: { error } }) => (
                                <InputPassword
                                    error={error}
                                    onChange={onChange}
                                    value={value}  
                                    label={t("auth.repeat_password")}
                                />
                            )}
                        />
                        <Button type="submit" className={classes.submit}>{t("auth.register")}</Button>
                    </form>
                </AuthWindow>
            </div>
            <div className={classes.links}>
                <NavLink to="/rules">{t("navigation.footer.rules")}</NavLink>
                <NavLink to="/confidentiality">{t("navigation.footer.conf")}</NavLink>
            </div>
        </div>
    )
}

let mapStateToProps = (state) => ({
    isFetching: state.common.isFetching,
    serverError: state.common.serverError,
    isRegisterDone: state.common.isRegisterDone
})

export default connect(mapStateToProps, {

})(Signup)