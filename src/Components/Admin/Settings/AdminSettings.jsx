import { Button } from '@mui/material'
import React, { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { connect } from 'react-redux'
import { getSiteInfo, setServerError } from '../../../Redux/commonReducer'
import { changePassword } from '../../../Redux/userReducer'
import AnimatedBlock from '../../Animation/AnimatedBlock/AnimatedBlock'
import Preloader from '../../Common/Preloader/Preloader'
import AdminLayout from '../../UI/Admin/AdminLayout/AdminLayout'
import Error from '../../UI/Form/Error/Error'
import Field from '../../UI/Form/Field/Field'
import InputPassword from '../../UI/Form/InputPassword'
import ServerResponse from '../../UI/ServerResponse/ServerResponse'
import classes from './AdminSettings.module.css'
import { makeStyles } from '@mui/styles';
import { Tabs } from '@mui/material'
import { Tab } from '@mui/material'
import { useState } from 'react'
import AdminSiteInfo from './SiteInfo/AdminSiteInfo'
import AdminDelivery from './Delivery/AdminDelivery'

const useTabStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTab-textColorPrimary': {
            color: "white",
            textTransform: "initial",
            fontSize: "16px",
            fontWeight: "700",
            fontFamily: "Montserrat",
            textTransform: "uppercase",
            transitionDuration: ".3s",
            color: "rgba(75, 94, 163, .5)"
        },
        '& .Mui-selected': {
            opacity: 1,
            color: "#4B5EA3 !important",
        },
        '& .MuiTabs-indicator': {
            backgroundColor: "transpa",
            height: "0px"
        }
    }
}));

const AdminSettings = (props) => {
    const { 
        isFetching,
        serverError,
        setServerError,
        serverResponse,
        changePassword,
        user,
        getSiteInfo
    } = props

    const { handleSubmit, control, watch, reset } = useForm()

    const { t } = useTranslation()

    const [currentTab, setCurrentTab] = useState(0)

    const handleTab = (e, value) => {
        setCurrentTab(value)
    }

    const onSubmit = (data) => {
        changePassword(user._id, data)
    }

    const material = useTabStyles()

    useEffect(() => {
        if(serverResponse) {
            reset({
                old_password: "",
                new_password: "",
                match_password: ""
            })
        }
    }, [serverResponse])

    useEffect(() => {
        getSiteInfo()
        return () => setServerError(null)
    }, [])

    return (
        <AdminLayout>
            {isFetching && <Preloader/>}
            {serverResponse && <ServerResponse/>}
            <AnimatedBlock className={classes.main}>
                <div className={classes.header}>
                    <h2>Настройки</h2>
                </div>
                <div className={classes.tabs}>
                    <Tabs
                        value={currentTab} 
                        onChange={handleTab}
                        classes={material}
                    >
                        <Tab value={0} label="Пароль"/>
                        <Tab value={1} label="Информация"/>
                        <Tab value={2} label="Доставка"/>
                    </Tabs>
                    <div className={classes.tabContent}>
                        {currentTab === 0 && (
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
                        )}
                        {currentTab === 1 && (
                            <AdminSiteInfo/>
                        )}
                        {currentTab === 2 && (
                            <AdminDelivery/>
                        )}
                    </div>
                </div>
            </AnimatedBlock>
        </AdminLayout>
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
    setServerError,
    getSiteInfo
})(AdminSettings)