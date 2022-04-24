import React, { useEffect, useState } from 'react'
import classes from '../../UI/Form/AdminForm.module.css'
import Field from '../../UI/Form/Field/Field'
import Modal from '../../UI/Modal/Modal'
import AdminInput from '../../UI/Form/AdminInput'
import { Button } from '@mui/material'
import { useForm, Controller } from 'react-hook-form'
import CustomAutocomplete from '../../UI/Form/Autocomplete'

const AdminEditCategory = (props) => {
    const { onClose, editCategory, allCategories, item, getAllCategoriesForSelect } = props

    const { handleSubmit, control, reset, setValue, getValues } = useForm()

    const handleClose = () => {
        onClose(null)
    }

    const onSubmit = (data) => {    
        if(data.p_id) {
            data.p_id = data.p_id._id
        }else {
            data.p_id = 0
        }    
        // console.log(data)
        editCategory(item._id, data)
    }

    useEffect(() => {
        getAllCategoriesForSelect()
    }, [])

    useEffect(() => {
        if(allCategories){
            reset({
                name: item.name || "",
                name_ua: item.name_ua || "",
                p_id: allCategories.find((elem) => elem._id == item.p_id) || 0
            })
        }
    }, [allCategories])

    return (
        <Modal title={`Редактировать ${item.name}`} onClose={handleClose}>
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
                <Controller
                    name="p_id"
                    control={control}
                    defaultValue={item.p_id}
                    render={({ field: { onChange, value }, fieldState: { error } }) => (
                        <CustomAutocomplete
                            value={value}
                            onChange={onChange}
                            items={allCategories.filter(elem => elem._id != item._id)}
                            label="Родительская категория"
                            setValue={setValue}
                            name={"p_id"}
                            defaultValue={getValues().p_id}
                        />
                    )}
                />
                <Button className={classes.submit} type='submit'>Добавить</Button>
            </form>
        </Modal>
    )
}

export default AdminEditCategory