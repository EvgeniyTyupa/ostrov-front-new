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
import { DropzoneArea } from 'material-ui-dropzone'
import CustomAutocomplete from '../../UI/Form/Autocomplete'
import { Button, MenuItem } from '@mui/material'
import { cx } from '../../../Utils/classnames'
import CustomSelect from '../../UI/Form/Select'
import { AGES, GENDERS } from '../../../Utils/constants'
import { useEffect } from 'react'

const AdminEditForm = (props) => {
    const { item, brands, categories, tags, onClose } = props

    const { handleSubmit, control, reset, setValue } = useForm()

    console.log(item)

    useEffect(() => {
        reset({
            name: item.name || "",
            name_ua: item.name_ua || "",
            articule: item.articule || "",
            code: item.code || "",
            price: item.price || "",
            cost_price: item.cost_price || "",
            description: item.description || "",
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

    }

    const handleClose = () => {
        onClose(null)
    }

    return (
        <Modal title={"Новый товар"} onClose={handleClose}>
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
                <Field>
                    <label className={classes.imagesLabel}>Картинки (1 титульная)</label>
                    <Controller
                        name="images"
                        control={control}
                        rules={{ required: "Обязательное поле!" }}
                        defaultValue=""
                        render={({ field: { onChange, value }, fieldState: { error } }) => (
                            <>
                                {console.log(value)}
                                <DropzoneArea
                                    onChange={onChange}
                                    initialFiles={value}
                                    filesLimit={9}
                                    classes={null}
                                    dropzoneClass={cx(classes.dropzone, error ? classes.dropzoneError : undefined)}
                                    // previewGridClasses={classes.dropzonePreview}
                                />
                                {error && <span className={classes.error}>{error.message}</span>}
                            </>
                        )}
                    />
                </Field>
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
                <div className={classes.footer}>
                    <Button type='submit'>Обновить</Button>
                    <Button onClick={handleClose}>Отмена</Button>
                </div>
            </form>
        </Modal>
    )
}

export default AdminEditForm