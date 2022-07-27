import React, { useEffect } from 'react'
import classes from '../../UI/Form/AdminForm.module.css'
import Field from '../../UI/Form/Field/Field'
import Modal from '../../UI/Modal/Modal'
import AdminInput from '../../UI/Form/AdminInput'
import { Button } from '@mui/material'
import { useForm, Controller } from 'react-hook-form'
import CustomAutocomplete from '../../UI/Form/Autocomplete'

const AdminAddCategory = (props) => {
    const { onClose, addCategory, allCategories, getAllCategoriesForSelect } = props

    const { handleSubmit, control, reset, setValue } = useForm()

    const onSubmit = (data) => {   
        if(data.p_id) {
            data.p_id = data.p_id._id
        }else {
            data.p_id = 0
        }
        addCategory(data)

        reset({
            name_ua: "",
            p_id: null
        })
    }

    useEffect(() => {
        getAllCategoriesForSelect()
    }, [])

    return (
        <Modal title="Новая категория" onClose={onClose}>
            <form className={classes.main} onSubmit={handleSubmit(onSubmit)}>
                <Field className={classes.row}>
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
                <Controller
                    name="p_id"
                    control={control}
                    defaultValue={null}
                    render={({ field: { onChange, value }, fieldState: { error } }) => (
                        <CustomAutocomplete
                            value={value}
                            onChange={onChange}
                            items={allCategories}
                            label="Родительская категория"
                            setValue={setValue}
                            name={"p_id"}
                        />
                    )}
                />
                <Button className={classes.submit} type='submit'>Добавить</Button>
            </form>
        </Modal>
    )
}

export default AdminAddCategory