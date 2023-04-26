import React from 'react'
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
import { GENDERS } from '../../../Utils/constants'
import { useEffect } from 'react'
import DropZone from '../../Common/DropZone/DropZone'
import { useChildAge } from '../../../Hooks/useChildAge'


const AdminEditForm = (props) => {
    const { item, brands, categories, tags, onClose, editItem } = props

    const { handleSubmit, control, reset, setValue } = useForm()

    const ages = useChildAge()

    useEffect(() => {
        reset({
            name_ua: item.name_ua || "",
            articule: item.articule || "",
            code: item.code || "",
            price: item.price || "",
            cost_price: item.cost_price || "",
            description_ua: item.description_ua || "",
            images: item.images || [],
            video_link: item.video_link || "",
            brand: item.brand || "",
            country: item.country || "",
            country_ua: item.country_ua || "",
            min_age: item.min_age || "",
            max_age: item.max_age || "",
            gender: item.gender || "",
            material: item.material || "",
            material_ua: item.material_ua || "",
            size: item.size || "",
            count: item.count || "",
            category: item.category || "",
            tags: item.tags || []
        })
    }, [])

    const onSubmit = (data) => {
        data.brand = data.brand._id
        data.category = data.category._id
        data.tags = data.tags.map(item => item._id)

        editItem(item._id, data)
    }

    const handleClose = () => {
        onClose(null)
    }

    return (
        <Modal title={`Редактировать ${item.name_ua}`} onClose={handleClose}>
            <form className={classes.main} onSubmit={handleSubmit(onSubmit)}>
                <Field className={classes.row}>
                    <Field>
                        <Controller
                            name="name_ua"
                            control={control}
                            defaultValue=""
                            rules={{ 
                                required: {
                                    value: true,
                                    message: "Обязательное поле!"
                                },
                                pattern: {
                                    value: /^[а-яієїґА-ЯІЄЇҐa-zA-Z0-9!:;'"@#$№%&*)(.,_ \^]+$/,
                                    message: "Нельзя использовать эти символы в названии товара <,>,?,~,/,+,-,="
                                }
                            }}
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
                                    regex="number"
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
                                    regex="number"
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
                    defaultValue=""
                    rules={{ required: "Обязательное поле!" }}
                    render={({ field: { onChange, value }, fieldState: { error } }) => (
                        <CustomAutocomplete
                            value={value}
                            onChange={onChange}
                            items={brands}
                            label="Бренд"
                            setValue={setValue}
                            name={"brand"}
                            error={error}
                        />
                    )}
                />
                <Field className={classes.row}>
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
                    <Controller
                        name="max_age"
                        control={control}
                        defaultValue=""
                        rules={{ required: "Обязательное поле!" }}
                        render={({ field: { onChange, value }, fieldState: { error } }) => (
                            <CustomSelect
                                onChange={(e) => {
                                    const newValue = Number(e.target.value)
                                    setValue('max_age', newValue)
                                    ages.forEach(el => {
                                        if(el.value[1] === newValue) {
                                            setValue('min_age', el.value[0])
                                        }
                                    })
                                }}
                                value={value}
                                label="Подходит по возрасту"  
                                error={error}
                            >
                                {ages.map(el => 
                                    el.value[1] > -1 && <MenuItem key={el.text} value={el.value[1]}>{el.text}</MenuItem>
                                )}
                            </CustomSelect>
                        )}
                    />
                </Field>
                <Field className={classes.row}>
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
                                regex="number"
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
                <div className={classes.footer}>
                    <Button type='submit'>Обновить</Button>
                    <Button onClick={handleClose}>Отмена</Button>
                </div>
            </form>
        </Modal>
    )
}

export default AdminEditForm