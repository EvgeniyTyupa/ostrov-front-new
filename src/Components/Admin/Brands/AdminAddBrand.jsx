import React from 'react'
import Modal from '../../UI/Modal/Modal'
import { useForm, Controller } from 'react-hook-form'
import classes from '../../UI/Form/AdminForm.module.css'
import Field from '../../UI/Form/Field/Field'
import AdminInput from '../../UI/Form/AdminInput'
import { Button } from '@mui/material'
import DropZone from '../../Common/DropZone/DropZone'

const AdminAddBrand = (props) => {
    const { onClose, addBrand } = props

    const { handleSubmit, control, reset } = useForm()

    const onSubmit = (data) => {
        addBrand(data)

        reset({
            name: "",
            image: []
        })
    }

    return (
        <Modal title="Новый бренд" onClose={onClose}>
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
                                />
                                {error && <span className={classes.error}>{error.message}</span>}
                            </>
                        )}
                    />
                </div>
                <Button className={classes.submit} type='submit'>Добавить</Button>
            </form>
        </Modal>
    )
}

export default AdminAddBrand