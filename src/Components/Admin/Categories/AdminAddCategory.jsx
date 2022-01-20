import React from 'react'
import classes from '../../UI/Form/AdminForm.module.css'
import Field from '../../UI/Form/Field/Field'
import Modal from '../../UI/Modal/Modal'
import AdminInput from '../../UI/Form/AdminInput'
import { Button } from '@mui/material'
import { useForm, Controller } from 'react-hook-form'
import CustomAutocomplete from '../../UI/Form/Autocomplete'

const AdminAddCategory = (props) => {
    const { onClose, addCategory, categories } = props

    const { handleSubmit, control, reset, setValue } = useForm()

    const onSubmit = (data) => [
        reset({
            name: "",
            name_ua: "",
            code: "",
            p_id: ""
        })
    ]

    return (
        <Modal title="Новая категория" onClose={onClose}>
            <form className={classes.main} onSubmit={handleSubmit(onSubmit)}>
                <Field className={classes.row}>
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
                </Field>
                <Field>
                    <label className={classes.label}>URL (будет отображаться в адресной строке)</label>
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
                                label="barbie"  
                            />
                        )}
                    />
                </Field>
                <Controller
                    name="category"
                    control={control}
                    defaultValue=""
                    render={({ field: { onChange, value }, fieldState: { error } }) => (
                        <CustomAutocomplete
                            value={value}
                            onChange={onChange}
                            items={categories}
                            label="Родительская категория"
                            setValue={setValue}
                            name={"category"}
                        />
                    )}
                />
                 <Button className={classes.submit} type='submit'>Добавить</Button>
            </form>
        </Modal>
    )
}

export default AdminAddCategory