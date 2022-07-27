import { Button } from '@mui/material'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { connect } from 'react-redux'
import { updateSiteInfo } from '../../../../Redux/commonReducer'
import Preloader from '../../../Common/Preloader/Preloader'
import AdminInput from '../../../UI/Form/AdminInput'
import classes from './AdminDelivery.module.css'
import { FaDollarSign } from 'react-icons/fa';
import { useEffect } from 'react'

const AdminDelivery = (props) => {
    const { updateSiteInfo, siteInfo, isFetching } = props

    const { handleSubmit, control, reset } = useForm()

    const onSubmit = (data) => {
        // data.phones = data.phones.map(el => el.value)
        data.office_delivery = +data.office_delivery
        data.courier_delivery = +data.courier_delivery
        updateSiteInfo(siteInfo[0]._id, data)
    }

    useEffect(() => {
        reset({
            office_delivery: siteInfo[0].office_delivery,
            courier_delivery: siteInfo[0].courier_delivery
        })
    }, [])

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={classes.main}>
            {isFetching && <Preloader/>}
            <div className={classes.header}>
                <h4>Бесплатная доставка</h4>
            </div>
            <Controller
                name="office_delivery"
                control={control}
                defaultValue=""
                rules={{ required: "Обязательное поле!" }}
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                    <AdminInput
                        onChange={onChange}
                        value={value}
                        error={error}
                        regex="number"
                        label="На отделение Новой Почты от суммы в чеке"
                        startAdornment={true}
                        startAdornmentIcon={<FaDollarSign/>}
                    />
                )}
            />
            <Controller
                name="courier_delivery"
                control={control}
                defaultValue=""
                rules={{ required: "Обязательное поле!" }}
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                    <AdminInput
                        onChange={onChange}
                        value={value}
                        error={error}
                        regex="number"
                        label="Курьером Новой Почты от суммы в чеке"
                        startAdornment={true}
                        startAdornmentIcon={<FaDollarSign/>}
                    />
                )}
            />
            <Button 
                className={classes.submitBut} 
                type="submit"
            >
                Сохранить
            </Button>
        </form>
    )
}

let mapStateToProps = (state) => ({
    siteInfo: state.common.siteInfo,
    isFetching: state.common.isFetching
})

export default connect(mapStateToProps, {
    updateSiteInfo
})(AdminDelivery)