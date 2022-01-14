import React, { useEffect } from 'react'
import classes from '../../UI/Form/AdminForm.module.css'
import { Controller, useForm } from 'react-hook-form'
import AdminInput from '../../UI/Form/AdminInput'
import Field from '../../UI/Form/Field/Field'
import Modal from '../../UI/Modal/Modal'
import { Button } from '@mui/material'

const AdminEditTag = (props) => {
    const { onClose, editTag, item } = props
    
    const { handleSubmit, control, reset } = useForm()

    const onSubmit = (data) => {
        console.log(data)
        editTag(item._id, data)
    }

    const handleClose = () => {
        onClose(null)
    }

    useEffect(() => {
        reset({
            name: item.name || "",
            name_ua: item.name_ua || ""
        })
    }, [])

    return (
        <Modal title={`Редактировать ${item.name}`} onClose={handleClose}>
            <form className={classes.main} onSubmit={handleSubmit(onSubmit)}>
                <Field className={classes.row}>
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
                        name="name_ua"
                        control={control}
                        defaultValue=""
                        rules={{ required: "Обязательное поле!" }}
                        render={({ field: { onChange, value }, fieldState: { error } }) => (
                            <AdminInput
                                onChange={onChange}
                                value={value}
                                error={error}
                                label="Название УКР"  
                            />
                        )}
                    />
                </Field>
                <Button className={classes.submit} type='submit'>Добавить</Button>
            </form>
        </Modal>
    )
}

export default AdminEditTag