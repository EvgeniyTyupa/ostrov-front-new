import React from 'react'
import { useForm, Controller } from 'react-hook-form'
import classes from '../../UI/Form/AdminForm.module.css'
import Field from '../../UI/Form/Field/Field'
import Modal from '../../UI/Modal/Modal'
import AdminInput from '../../UI/Form/AdminInput'
import { Button } from '@mui/material'

const AdminAddTag = (props) => {
    const { onClose, addTag } = props

    const { handleSubmit, control, reset } = useForm()

    const onSubmit = (data) => {
        addTag(data)

        reset({
            name_ua: ""
        })
    }

    return (
        <Modal title="Новый тег" onClose={onClose}>
            <form className={classes.main} onSubmit={handleSubmit(onSubmit)}>
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

export default AdminAddTag