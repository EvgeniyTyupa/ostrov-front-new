import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { connect } from 'react-redux'
import { setIsOpenForgotPassModal, setServerResponse } from '../../Redux/commonReducer'
import AdminInput from '../UI/Form/AdminInput'
import Field from '../UI/Form/Field/Field'
import Modal from '../UI/Modal/Modal'
import classes from './Style.module.css'
import { MdOutlineAlternateEmail } from 'react-icons/md';
import CustomButton from '../UI/Button/CustomButton'
import Error from '../UI/Form/Error/Error'
import { forgotPass } from '../../Redux/userReducer'

const ForgotPassModal = (props) => {
    const { 
        setIsOpenForgotPassModal,
        serverError,
        forgotPass,
        serverResponse,
        setServerResponse
    } = props

    const { handleSubmit, control, reset } = useForm()

    const { t } = useTranslation()

    const onSubmit = (data) => {
        forgotPass(data)
    }

    const onClose = () => {
        setServerResponse(null)
        setIsOpenForgotPassModal(false)
    }

    return (
        <Modal title={t("form.forgot_pass_title")} onClose={onClose} className={classes.modal}>
            {serverResponse ? <p className={classes.message}>{serverResponse}</p> :
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
                                    placeholder="example@gmail.com"
                                    startAdornment={true}
                                    startAdornmentIcon={<MdOutlineAlternateEmail/>}
                                />
                            )}
                        />
                    </Field>
                    {serverError && <Error text={serverError}/>}
                    <CustomButton type="submit">
                        {t("form.forgot_submit")}
                    </CustomButton>
                </form>
            }
        </Modal>
    )
}

let mapStateToProps = (state) => ({
    serverError: state.common.serverError,
    isFetching: state.common.isFetching,
    serverResponse: state.common.serverResponse
})

export default connect(mapStateToProps, {
    setIsOpenForgotPassModal,
    setServerResponse,
    forgotPass
})(ForgotPassModal)