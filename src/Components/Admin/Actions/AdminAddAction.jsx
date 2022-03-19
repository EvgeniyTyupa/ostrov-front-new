import React, { useEffect, useState } from 'react'
import classes from '../../UI/Form/AdminForm.module.css'
import Field from '../../UI/Form/Field/Field'
import AdminInput from '../../UI/Form/AdminInput'
import { Button, MenuItem } from '@mui/material'
import DropZone from '../../Common/DropZone/DropZone'
import Modal from '../../UI/Modal/Modal'
import { useForm, Controller } from 'react-hook-form'
import moment from 'moment'
import StartDatePicker from '../../UI/Form/DatePicker/StartDatePicker'
import EndDatePicker from '../../UI/Form/DatePicker/EndDatePicker'
import { DISCOUNT_TYPES, KIND_OF_ACTION } from '../../../Utils/constants'
import CustomSelect from '../../UI/Form/Select'
import CustomCheckbox from '../../UI/Form/Checkbox'
import CustomAutocomplete from '../../UI/Form/Autocomplete'
import MultiAdminSearch from '../../UI/Admin/Table/Search/MultiAdminSearch'

const AdminAddAction = (props) => {
    const { 
        onClose, 
        addAction, 
        items,
        getItems, 
        getCategories,
        getBrands,
        getTags
    } = props

    const { handleSubmit, control, reset, setValue } = useForm()

    const [minDate, setMinDate] = useState(null)
    const [maxDate, setMaxDate] = useState(null)

    const [discountType, setDiscountType] = useState(DISCOUNT_TYPES.percent)
    const [kindOfAction, setKindOfAction] = useState(KIND_OF_ACTION[0].value)

    const [isHavingGift, setIsHavingGift] = useState(false)

    const [actionTypeName, setActionTypeName] = useState("brands_id")

    const handleIsHavingGift = () => {
        setIsHavingGift(!isHavingGift)
    }

    const onSubmit = (data) => {
        console.log(data)
    }

    useEffect(() => {
        if(!isHavingGift){
            setValue('gift', null)
        }
    }, [isHavingGift])

    useEffect(() => {
        reset({
            title: "",
            title_ua: "",
            image: [],
            image_mobile: [],
            start: moment(),
            end: null,
            gift: [],
            kind_of_action: KIND_OF_ACTION[0].value
        })
    }, [])

    useEffect(() => {
        if(kindOfAction === KIND_OF_ACTION[0].value) {
            setActionTypeName("brands_id")
        } else if(kindOfAction === KIND_OF_ACTION[1].value) {
            setActionTypeName("categories_id")
        } else if(kindOfAction === KIND_OF_ACTION[2].value) {
            setActionTypeName("tags_id")
        } else {
            setActionTypeName("items_id")
        }
    }, [kindOfAction])

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
                            <StartDatePicker
                                value={value}
                                onChange={onChange}
                                label="Старт"
                                error={error}
                                setMinDate={setMinDate}
                                maxDate={maxDate}
                            />
                        )}
                    />
                    <Controller
                        name="end"
                        control={control}
                        rules={{ required: "Обязательное поле!" }}
                        defaultValue=""
                        render={({ field: { onChange, value }, fieldState: { error } }) => (
                            <EndDatePicker
                                value={value}
                                onChange={onChange}
                                label="Конец"
                                error={error}
                                minDate={minDate}
                                setMaxDate={setMaxDate}
                            />
                        )}
                    />
                </div>
                <Field className={classes.row}>
                    <CustomSelect
                        onChange={e => setDiscountType(e.target.value)}
                        value={discountType}
                        label="Тип скидки"
                    >
                        {Object.keys(DISCOUNT_TYPES).map(function(key, index) {
                            return (
                                <MenuItem value={DISCOUNT_TYPES[key]} key={DISCOUNT_TYPES[key]}>
                                    {DISCOUNT_TYPES[key]}
                                </MenuItem>
                            )
                        })}
                    </CustomSelect>
                    <Controller
                        name="discount"
                        control={control}
                        defaultValue=""
                        rules={{ required: "Обязательное поле!" }}
                        render={({ field: { onChange, value }, fieldState: { error } }) => (
                            <AdminInput
                                onChange={onChange}
                                value={value}
                                error={error}
                                label="Размер скидки"
                                regex="number"
                                placeholder="В цифрах"
                            />
                        )}
                    />
                </Field>
                <div>
                    <CustomCheckbox
                        label="Подарок"
                        checked={isHavingGift}
                        onChange={handleIsHavingGift}
                    />
                    {isHavingGift &&
                        <Controller
                            name="gift"
                            control={control}
                            defaultValue={[]}
                            rules={{ required: "Обязательное поле!" }}
                            render={({ field: { onChange, value }, fieldState: { error } }) => (
                                <MultiAdminSearch
                                    value={value}
                                    onChange={onChange}
                                    items={items}
                                    multiple={true}
                                    label="Имя товара"
                                    error={error}
                                    setValue={setValue}
                                    name={"gift"}
                                    onSearch={getItems}
                                />
                            )}
                        />
                    }
                </div>
                <Controller
                    name='kind_of_action'
                    control={control}
                    defaultValue={""}
                    rules={{ required: "Обязательное поле!" }}
                    render={({ field: { onChange, value }, fieldState: { error } }) => (
                        <CustomSelect
                            onChange={e => {
                                onChange(e.target.value)
                                setKindOfAction(e.target.value)
                            }}
                            value={value}
                            label="Акция на:"
                            error={error}
                        >
                            {KIND_OF_ACTION.map(item => (
                                <MenuItem key={item.value} value={item.value}>{item.label}</MenuItem>
                            ))}
                        </CustomSelect>
                    )}
                />
                <Controller
                    name={actionTypeName}
                    control={control}
                    defaultValue={[]}
                    rules={{ required: "Обязательное поле!" }}
                    render={({ field: { onChange, value }, fieldState: { error } }) => (
                        <MultiAdminSearch
                            value={value}
                            onChange={onChange}
                            items={items}
                            multiple={true}
                            label="Имя товара"
                            error={error}
                            setValue={setValue}
                            name={actionTypeName}
                            onSearch={
                                kindOfAction === KIND_OF_ACTION[0].value && getBrands ||
                                kindOfAction === KIND_OF_ACTION[1].value && getCategories ||
                                kindOfAction === KIND_OF_ACTION[2].value && getTags ||
                                kindOfAction === KIND_OF_ACTION[3].value && getItems 
                            }
                        />
                    )}
                />
            </form>
        </Modal>
    )
}

export default AdminAddAction