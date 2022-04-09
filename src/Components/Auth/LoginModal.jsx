import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { connect } from 'react-redux'
import { setIsOpenLogin } from '../../Redux/commonReducer'
import CustomButton from '../UI/Button/CustomButton'
import Error from '../UI/Form/Error/Error'
import Field from '../UI/Form/Field/Field'
import InputPassword from '../UI/Form/InputPassword'
import Modal from '../UI/Modal/Modal'
import classes from './Style.module.css'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AdminInput from '../UI/Form/AdminInput'
import { login } from '../../Redux/userReducer'
import { NavLink } from 'react-router-dom'

const LoginModal = (props) => {
    const { setIsOpenLogin, serverError, login } = props

    const { t } = useTranslation()

    const { handleSubmit, control, reset } = useForm()

    const onSubmit = (data) => {
        login(data)

        reset({
            email: data.email,
            password: ""
        })
    }

    const onClose = () => {
        setIsOpenLogin(false)
    }

    return (
        <Modal title={t("auth.login")} onClose={onClose} className={classes.modal}>
            <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
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
                <CustomButton type="submit" className={classes.submit}>{t("auth.loginSubmit")}</CustomButton>
                <NavLink to="/reset_password">{t("form.forgot_pass")}</NavLink>
            </form>
        </Modal>
    )
}

let mapStateToProps = (state) => ({
    serverError: state.common.serverError
})

export default connect(mapStateToProps, {
    setIsOpenLogin,
    login
})(LoginModal)