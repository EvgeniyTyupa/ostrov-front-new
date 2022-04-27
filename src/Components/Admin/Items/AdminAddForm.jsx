import React, { useEffect } from 'react'
import classes from '../../UI/Form/AdminForm.module.css'
import { Controller, useForm } from 'react-hook-form'
import AdminInput from '../../UI/Form/AdminInput'
import Field from '../../UI/Form/Field/Field'
import Modal from '../../UI/Modal/Modal'
import { FaBarcode, FaCode, FaDollarSign } from 'react-icons/fa';
import { GrStorage } from 'react-icons/gr';
import { GiWeight } from 'react-icons/gi';
import { BsYoutube } from 'react-icons/bs';
import CustomAutocomplete from '../../UI/Form/Autocomplete'
import { Button, MenuItem } from '@mui/material'
import CustomSelect from '../../UI/Form/Select'
import { AGES, GENDERS } from '../../../Utils/constants'
import DropZone from '../../Common/DropZone/DropZone'

const AdminAddForm = (props) => {
    const { onClose, brands, categories, tags, createItem } = props

    const { handleSubmit, control, reset, setValue } = useForm()

    const onSubmit = (data) => {
        data.brand = data.brand._id
        data.category = data.category._id
        data.tags = data.tags.map(item => item._id)

        createItem(data)

        reset({
            name: "",
            name_ua: "",
            articule: "",
            code: "",
            price: "",
            cost_price: "",
            description: "",
            description_ua: "",
            images: [],
            video_link: "",
            brand: null,
            country: "",
            country_ua: "",
            min_age: "",
            max_age: "",
            gender: "",
            material: "",
            material_ua: "",
            size: "",
            count: "",
            category: null,
            tags: []
        })
    }

    return (
        <Modal title={"Новый товар"} onClose={onClose}>
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
                <Field className={classes.row}>
                    <Field>
                        <Controller
                            name="articule"
                            control={control}
                            defaultValue=""
                            rules={{ required: "Обязательное поле!" }}
                            render={({ field: { onChange, value }, fieldState: { error } }) => (
                                <AdminInput
                                    onChange={onChange}
                                    value={value}
                                    error={error}
                                    label="Артикул"  
                                    startAdornment={true}
                                    startAdornmentIcon={<FaCode/>}
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
                                    label="Код"  
                                    startAdornment={true}
                                    startAdornmentIcon={<FaBarcode/>}
                                />
                            )}
                        />
                    </Field>
                </Field>
                <Field className={classes.row}>
                    <Field>
                        <Controller
                            name="price"
                            control={control}
                            defaultValue=""
                            rules={{ required: "Обязательное поле!" }}
                            render={({ field: { onChange, value }, fieldState: { error } }) => (
                                <AdminInput
                                    onChange={onChange}
                                    value={value}
                                    error={error}
                                    label="Цена"  
                                    startAdornment={true}
                                    startAdornmentIcon={<FaDollarSign/>}
                                />
                            )}
                        />
                    </Field>
                    <Field>
                        <Controller
                            name="cost_price"
                            control={control}
                            defaultValue=""
                            render={({ field: { onChange, value }, fieldState: { error } }) => (
                                <AdminInput
                                    onChange={onChange}
                                    value={value}
                                    label="Себестоимость"  
                                    startAdornment={true}
                                    startAdornmentIcon={<FaDollarSign/>}
                                />
                            )}
                        />
                    </Field>
                </Field>
                <Field>
                    <Controller
                        name="description"
                        control={control}
                        defaultValue=""
                        render={({ field: { onChange, value }, fieldState: { error } }) => (
                            <AdminInput
                                onChange={onChange}
                                value={value}
                                label="Описание"
                                multiline={true}
                                rows={6}
                            />
                        )}
                    />
                </Field>
                <Field>
                    <Controller
                        name="description_ua"
                        control={control}
                        defaultValue=""
                        render={({ field: { onChange, value }, fieldState: { error } }) => (
                            <AdminInput
                                onChange={onChange}
                                value={value}
                                label="Описание УКР"
                                multiline={true}
                                rows={6}
                            />
                        )}
                    />
                </Field>
                <div>
                    <Controller
                        name="images"
                        control={control}
                        rules={{ required: "Обязательное поле!" }}
                        defaultValue=""
                        render={({ field: { onChange, value }, fieldState: { error } }) => (
                            <>
                                <DropZone
                                    onChange={onChange}
                                    multiple
                                    initialFiles={value}
                                    error={error}
                                />
                            </>
                        )}
                    />
                </div>
                <Field>
                    <Controller
                        name="video_link"
                        control={control}
                        defaultValue=""
                        render={({ field: { onChange, value }, fieldState: { error } }) => (
                            <AdminInput
                                onChange={onChange}
                                value={value}
                                label="Видео Youtube"
                                placeholder="https://www.youtube.com/embed/vO7pqwo5hA4"
                                startAdornment={true}
                                startAdornmentIcon={<BsYoutube/>}
                            />
                        )}
                    />
                </Field>
                <Controller
                    name="brand"
                    control={control}
                    defaultValue={null}
                    render={({ field: { onChange, value }, fieldState: { error } }) => (
                        <CustomAutocomplete
                            value={value}
                            onChange={onChange}
                            items={brands}
                            label="Бренд"
                            setValue={setValue}
                            name={"brand"}
                        />
                    )}
                />
                <Field className={classes.row}>
                    <Field>
                        <Controller
                            name="country"
                            control={control}
                            defaultValue=""
                            render={({ field: { onChange, value }, fieldState: { error } }) => (
                                <AdminInput
                                    onChange={onChange}
                                    value={value}
                                    label="Страна производитель"  
                                />
                            )}
                        />
                    </Field>
                    <Field>
                        <Controller
                            name="country_ua"
                            control={control}
                            defaultValue=""
                            render={({ field: { onChange, value }, fieldState: { error } }) => (
                                <AdminInput
                                    onChange={onChange}
                                    value={value}
                                    label="Страна производитель УКР"  
                                />
                            )}
                        />
                    </Field>
                </Field>
                <Field className={classes.row}>
                    <Controller
                        name="min_age"
                        control={control}
                        defaultValue=""
                        rules={{ required: "Обязательное поле!" }}
                        render={({ field: { onChange, value }, fieldState: { error } }) => (
                            <CustomSelect
                                onChange={onChange}
                                value={value}
                                label="Минимальный возраст"  
                                error={error}
                            >
                                {AGES.map(item => <MenuItem value={item} key={item}>{item}</MenuItem>)}
                            </CustomSelect>
                        )}
                    />
                    <Controller
                        name="max_age"
                        control={control}
                        defaultValue=""
                        rules={{ required: "Обязательное поле!" }}
                        render={({ field: { onChange, value }, fieldState: { error } }) => (
                            <CustomSelect
                                onChange={onChange}
                                value={value}
                                label="Максимальный возраст"  
                                error={error}
                            >
                                {AGES.map(item => <MenuItem value={item} key={item}>{item}</MenuItem>)}
                            </CustomSelect>
                        )}
                    />
                </Field>
                
                <Controller
                    name="gender"
                    control={control}
                    rules={{ required: "Обязательное поле!" }}
                    defaultValue=""
                    render={({ field: { onChange, value }, fieldState: { error } }) => (
                        <CustomSelect
                            onChange={onChange}
                            value={value}
                            label="Пол"  
                            error={error}
                        >
                            {GENDERS.map(item => <MenuItem value={item.value} key={item.value}>{item.text}</MenuItem>)}
                        </CustomSelect>
                    )}
                />
               
                <Field className={classes.row}>
                    <Controller
                        name="material"
                        control={control}
                        defaultValue=""
                        render={({ field: { onChange, value }, fieldState: { error } }) => (
                            <AdminInput
                                onChange={onChange}
                                value={value}
                                error={error}
                                label="Материал"
                            />
                        )}
                    />
                    <Controller
                        name="material_ua"
                        control={control}
                        defaultValue=""
                        render={({ field: { onChange, value }, fieldState: { error } }) => (
                            <AdminInput
                                onChange={onChange}
                                value={value}
                                error={error}
                                label="Материал УКР"
                            />
                        )}
                    />
                </Field>
                <Field className={classes.row}>
                    <Controller
                        name="size"
                        control={control}
                        defaultValue=""
                        render={({ field: { onChange, value }, fieldState: { error } }) => (
                            <AdminInput
                                onChange={onChange}
                                value={value}
                                label="Размер (шир. x выс. см)"
                                startAdornment={true}
                                startAdornmentIcon={<GiWeight/>}
                            />
                        )}
                    />
                    <Controller
                        name="count"
                        control={control}
                        defaultValue=""
                        rules={{ required: "Обязательное поле!" }}
                        render={({ field: { onChange, value }, fieldState: { error } }) => (
                            <AdminInput
                                onChange={onChange}
                                value={value}
                                error={error}
                                label="Кол-во на складе"
                                startAdornment={true}
                                startAdornmentIcon={<GrStorage/>}
                            />
                        )}
                    />
                </Field>
                <div style={{ marginTop: "10px" }}>
                    <Controller
                        name="category"
                        control={control}
                        defaultValue={null}
                        rules={{ required: "Обязательное поле!" }}
                        render={({ field: { onChange, value }, fieldState: { error } }) => (
                            <CustomAutocomplete
                                value={value}
                                onChange={onChange}
                                items={categories}
                                label="Категория"
                                error={error}
                                setValue={setValue}
                                name={"category"}
                            />
                        )}
                    />
                </div>
                <div style={{ marginTop: "20px" }}>
                    <Controller
                        name="tags"
                        control={control}
                        defaultValue={[]}
                        rules={{ required: "Обязательное поле!" }}
                        render={({ field: { onChange, value }, fieldState: { error } }) => (
                            <CustomAutocomplete
                                value={value}
                                onChange={onChange}
                                items={tags}
                                multiple={true}
                                label="Теги"
                                error={error}
                                setValue={setValue}
                                name={"tags"}
                            />
                        )}
                    />
                </div>
                <Button className={classes.submit} type='submit'>Добавить</Button>
            </form>
        </Modal>
    )
}

export default AdminAddForm