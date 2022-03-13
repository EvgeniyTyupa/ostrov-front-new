import React from 'react'
import classes from '../../UI/Form/AdminForm.module.css'
import Field from '../../UI/Form/Field/Field'
import AdminInput from '../../UI/Form/AdminInput'
import { Button } from '@mui/material'
import DropZone from '../../Common/DropZone/DropZone'
import Modal from '../../UI/Modal/Modal'
import { useForm, Controller } from 'react-hook-form'
import DatePicker from '../../UI/Form/DatePicker'

const AdminAddAction = (props) => {
    const { onClose, addAction } = props

    const { handleSubmit, control, reset } = useForm()

    const onSubmit = (data) => {
        console.log(data)
    }

    return (
        <Modal title="Новая акция" onClose={onClose}>
            <form className={classes.main} onSubmit={handleSubmit(onSubmit)}>
                <Field className={classes.row}>
                    <Field>
                        <Controller
                            name="title"
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
                            name="title_ua"
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
                                    title="Изображение 16х9"
                                    error={error}
                                />
                            </>
                        )}
                    />
                </div>
                <div>
                    <Controller
                        name="image_mobile"
                        control={control}
                        rules={{ required: "Обязательное поле!" }}
                        defaultValue=""
                        render={({ field: { onChange, value }, fieldState: { error } }) => (
                            <>
                                <DropZone
                                    onChange={onChange}
                                    initialFiles={value}
                                    title="Изображение 9х16 (для моб. устройств)"
                                    error={error}
                                />
                            </>
                        )}
                    />
                </div>
                <div className={classes.dateField}>
                    <Controller
                        name="start"
                        control={control}
                        rules={{ required: "Обязательное поле!" }}
                        defaultValue=""
                        render={({ field: { onChange, value }, fieldState: { error } }) => (
                            <DatePicker
                                value={value}
                                onChange={onChange}
                                label="Старт"
                                error={error}
                            />
                        )}
                    />
                    <Controller
                        name="end"
                        control={control}
                        rules={{ required: "Обязательное поле!" }}
                        defaultValue=""
                        render={({ field: { onChange, value }, fieldState: { error } }) => (
                            <DatePicker
                                value={value}
                                onChange={onChange}
                                label="Конец"
                                error={error}
                            />
                        )}
                    />
                </div>
            </form>
        </Modal>
    )
}

export default AdminAddAction