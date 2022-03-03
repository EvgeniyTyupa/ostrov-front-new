import React from 'react'
import classes from '../../UI/Form/AdminForm.module.css'
import Modal from '../../UI/Modal/Modal'
import { useForm, Controller } from 'react-hook-form'
import Field from '../../UI/Form/Field/Field'
import AdminInput from '../../UI/Form/AdminInput'
import { Button } from '@mui/material'
import DropZone from '../../Common/DropZone/DropZone'
import { useEffect } from 'react'

const AdminEditNews = (props) => {
    const { onClose, item } = props
    const { handleSubmit, control, reset, getValues } = useForm()

    const onSubmit = (data) => {
        console.log(data)
    }

    const handleClose = () => {
        onClose(null)
    }

    useEffect(() => {
        reset({
            title: item.title || "",
            title_ua: item.title_ua || "",
            paragraphs: item.paragraphs.map((el, index) => (
                { id: index, value: el }
            )),
            paragraphs_ua: item.paragraphs_ua.map((el, index) => (
                { id: index, value: el }
            )),
        })
    }, [])

    return (
        <Modal title={`Редактировать ${item.title}`} onClose={handleClose}>
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
                                    label="Заголовок"  
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
                                    label="Заголовок (УКР)"  
                                />
                            )}
                        />
                    </Field>
                </Field>
            </form>
        </Modal>
    )
}

export default AdminEditNews