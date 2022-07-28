import React, { useEffect } from 'react'
import Modal from '../../UI/Modal/Modal'
import { useForm, Controller } from 'react-hook-form'
import classes from '../../UI/Form/AdminForm.module.css'
import Field from '../../UI/Form/Field/Field'
import AdminInput from '../../UI/Form/AdminInput'
import { Button } from '@mui/material'
import DropZone from '../../Common/DropZone/DropZone'

const AdminEditBrand = (props) => {
    const { onClose, editBrand, item } = props

    const { handleSubmit, control, reset } = useForm()

    const onSubmit = (data) => {
        editBrand(item._id, data)
    }

    const handleClose = () => {
        onClose(null)
    }

    useEffect(() => {
        reset({
            name: item.name || "",
            image: [item.image] || []
        })
    }, [])

    console.log(item)

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
                <div>
                    <Controller
                        name="image"
                        control={control}
                        rules={{ required: "Обязательное поле!" }}
                        defaultValue=""
                        render={({ field: { onChange, value }, fieldState: { error } }) => (
                            <>
                                <DropZone
                                    onChange={onChange}
                                    initialFiles={value}
                                    title="Изображение"
                                    error={error}
                                />
                            </>
                        )}
                    />
                </div>
                <div className={classes.footer}>
                    <Button type='submit'>Обновить</Button>
                    <Button onClick={handleClose}>Отмена</Button>
                </div>
            </form>
        </Modal>
    )
}

export default AdminEditBrand