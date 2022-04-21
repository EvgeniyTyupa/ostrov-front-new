import React from 'react'
import classes from '../../UI/Form/AdminForm.module.css'
import { Controller, useForm } from 'react-hook-form'
import AdminInput from '../../UI/Form/AdminInput'
import Field from '../../UI/Form/Field/Field'
import Modal from '../../UI/Modal/Modal'
import InputPassword from '../../UI/Form/InputPassword'
import { useTranslation } from 'react-i18next'
import { connect } from 'react-redux'
import { setServerError } from '../../../Redux/commonReducer'
import Error from '../../UI/Form/Error/Error'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { cx } from '../../../Utils/classnames'
import { Button } from '@mui/material'

const AdminAdd = (props) => {
    const {
        onClose,
        setServerError,
        serverError
    } = props

    const { t } = useTranslation()

    const { handleSubmit, control, reset, setValue, watch } = useForm()

    const onSubmit = (data) => {
        console.log(data)
    }

    return (
        <Modal title={"Добавить администратора"} onClose={onClose}>
            <form className={classes.main} onSubmit={handleSubmit(onSubmit)}>
                <Field>
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
                            <div className={classes.emailContainer}>
                                <AdminInput
                                    onChange={(e) => {
                                        onChange(e)
                                        setServerError(null)
                                    }}
                                    value={value}
                                    error={error}
                                    label={"Email"}
                                    startAdornment={true}
                                    startAdornmentIcon={<AccountCircleIcon/>}
                                />
                                {serverError && <Error text={serverError}/>}
                            </div>
                        )}
                    />
                </Field>
                <Field className={cx(classes.row, classes.password)}>
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
                                value: (value) => value.length > 5 || t("errors.passLong")
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
                </Field>
                <Field className={classes.row}>
                    <Controller
                        name="first_name"
                        control={control}
                        defaultValue=""
                        rules={{ 
                            required: {
                                value: true,
                                message: t("errors.required")
                            },
                        }}
                        render={({ field: { onChange, value }, fieldState: { error } }) => (
                            <AdminInput
                                onChange={onChange}
                                value={value}
                                error={error}
                                label={"Имя"}
                            />
                        )}
                    />
                    <Controller
                        name="last_name"
                        control={control}
                        defaultValue=""
                        rules={{ 
                            required: {
                                value: true,
                                message: t("errors.required")
                            },
                        }}
                        render={({ field: { onChange, value }, fieldState: { error } }) => (
                            <AdminInput
                                onChange={onChange}
                                value={value}
                                error={error}
                                label={"Фамилия"}
                            />
                        )}
                    />
                </Field>
                <Field>
                    <Controller
                        name="phone"
                        control={control}
                        defaultValue=""
                        rules={{ 
                            required: {
                                value: true,
                                message: t("errors.required")
                            },
                        }}
                        render={({ field: { onChange, value }, fieldState: { error } }) => (
                            <AdminInput
                                onChange={onChange}
                                value={value}
                                regex="number"
                                label="Телефон"
                                startAdornment={true}
                                startAdornmentIcon={<span>+380</span>}
                            />
                        )}
                    />
                </Field>
                <Button className={classes.submit} type='submit'>Добавить</Button>
            </form>
        </Modal>
    )
}

let mapStateToProps = (state) => ({
    serverError: state.common.serverError
})

export default connect(mapStateToProps, {
    setServerError
})(AdminAdd)