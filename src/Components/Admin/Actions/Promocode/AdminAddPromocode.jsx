import { Button, MenuItem } from '@mui/material'
import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { DISCOUNT_TYPES } from '../../../../Utils/constants'
import classes from '../../../UI/Form/AdminForm.module.css'
import AdminInput from '../../../UI/Form/AdminInput'
import Field from '../../../UI/Form/Field/Field'
import CustomSelect from '../../../UI/Form/Select'
import Modal from '../../../UI/Modal/Modal'

const AdminAddPromocode = (props) => {
    const {
        onClose,
        addPromocode
    } = props

    const { handleSubmit, control } = useForm()

    const [discountType, setDiscountType] = useState(DISCOUNT_TYPES.percent)

    const onSubmit = (data) => {
        if(discountType === DISCOUNT_TYPES.percent) {
            data.discount = data.discount + '%'
        }
        addPromocode(data)
    }

    return (
        <Modal title="Новый промокод" onClose={onClose}>
            <form className={classes.main} onSubmit={handleSubmit(onSubmit)}>
                <Field>
                    <Controller
                        name="name"
                        control={control}
                        defaultValue=""
                        rules={{ required: "Обязательное поле!" }}
                        render={({ field: { onChange, value }, fieldState: { error } }) => (
                            <AdminInput
                                onChange={onChange}
                                value={value}
                                error={error}
                                label="Название"  
                            />
                        )}
                    />
                </Field>
                <Field>
                    <Controller
                        name="code"
                        control={control}
                        defaultValue=""
                        rules={{ required: "Обязательное поле!" }}
                        render={({ field: { onChange, value }, fieldState: { error } }) => (
                            <AdminInput
                                onChange={onChange}
                                value={value}
                                error={error}
                                label="Промокод"  
                            />
                        )}
                    />
                </Field>
                <Field className={classes.row}>
                    <CustomSelect
                        onChange={e => setDiscountType(e.target.value)}
                        value={discountType}
                        label="Тип скидки"
                    >
                        {Object.keys(DISCOUNT_TYPES).map(function(key, index) {
                            return (
                                <MenuItem value={DISCOUNT_TYPES[key]} key={DISCOUNT_TYPES[key]}>
                                    {DISCOUNT_TYPES[key]}
                                </MenuItem>
                            )
                        })}
                    </CustomSelect>
                    <Controller
                        name="discount"
                        control={control}
                        defaultValue=""
                        rules={{ required: "Обязательное поле!" }}
                        render={({ field: { onChange, value }, fieldState: { error } }) => (
                            <AdminInput
                                onChange={onChange}
                                value={value}
                                error={error}
                                label="Размер скидки"
                                regex="number"
                                placeholder="В цифрах"
                            />
                        )}
                    />
                </Field>
                <Button className={classes.submit} type='submit'>Добавить</Button>
            </form>
        </Modal>
    )
}

export default AdminAddPromocode