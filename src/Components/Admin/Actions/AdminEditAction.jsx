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
import { ACTION_KONDITIONS, DISCOUNT_TYPES, KIND_OF_ACTION } from '../../../Utils/constants'
import CustomSelect from '../../UI/Form/Select'
import CustomCheckbox from '../../UI/Form/Checkbox'
import MultiAdminSearch from '../../UI/Admin/Table/Search/MultiAdminSearch'
import { FaMoneyBillAlt, FaShoppingBasket } from 'react-icons/fa';

const AdminEditAction = (props) => {
    const { 
        onClose, 
        editAction, 
        items,
        tags,
        brands,
        categories,
        getItems, 
        getCategories,
        getBrands,
        getTags,
        item
    } = props

    const { handleSubmit, control, reset, setValue } = useForm()

    const [minDate, setMinDate] = useState(null)
    const [maxDate, setMaxDate] = useState(null)

    const [discountType, setDiscountType] = useState(item.discount.includes("%") ? DISCOUNT_TYPES.percent : DISCOUNT_TYPES.fixed)
    const [kindOfAction, setKindOfAction] = useState(item.kind_of_action)
    const [actionCondition, setActionCondition] = useState(ACTION_KONDITIONS[2].value)

    const [isHavingGift, setIsHavingGift] = useState(item.gift.length > 0 ? true : false)

    const [actionTypeName, setActionTypeName] = useState(
        (item.brands_id && item.brands_id.length > 0) ? "brands_id" :
        (item.categories_id && item.categories_id.length > 0)  ? "categories_id" :
        (item.tags_id && item.tags_id.length > 0) ? "tags_id" :
        (item.items_id && item.items_id.length > 0) ? "items_id" : ""
    )

    const handleIsHavingGift = () => {
        setIsHavingGift(!isHavingGift)
    }

    const onSubmit = (data) => {
        data.brands_id = data.brands_id.length > 0 ? data.brands_id.map(item => item._id) : null
        data.categories_id = data.categories_id.length > 0 ? data.categories_id.map(item => item._id) : null
        data.tags_id = data.tags_id.length > 0 ? data.tags_id.map(item => item._id) : null
        data.items_id = data.items_id.length > 0 ? data.items_id.map(item => item._id) : null

        data.gift = data.gift.length > 0 ? data.gift.map(item => item._id) : null

        data.start = new Date(data.start)
        data.end = new Date(data.end)

        editAction(item._id, data)
    }

    useEffect(() => {
        if(!isHavingGift){
            setValue('gift', [])
        }else {
            setActionCondition(
                item.from_items_count ? ACTION_KONDITIONS[1].value :
                item.from_sum_in_bill ? ACTION_KONDITIONS[0].value :
                ACTION_KONDITIONS[2].value 
            )
        }
    }, [isHavingGift])

    useEffect(() => {
        if(item){
            reset({
                title: item.title || "",
                title_ua: item.title_ua || "",
                description: item.description || "",
                description_ua: item.description_ua || "",
                image: [item.image] || [],
                image_mobile: [item.image_mobile] || [],
                start: moment(item.start) || moment(),
                end: moment(item.end) || null,
                gift: item.gift || [],
                kind_of_action: item.kind_of_action || KIND_OF_ACTION[0].value,
                brands_id: item.brands_id || [],
                categories_id: item.categories_id || [],
                items_id: item.items_id || [],
                tags_id: item.tags_id || [],
                from_sum_in_bill: item.from_sum_in_bill || null,
                from_items_count: item.from_items_count || null,
                discount: item.discount.replace("%", '') || 0
            })
        }
    }, [item])

    useEffect(() => {
        setValue('brands_id', item.brands_id)
        setValue('categories_id', item.categories_id)
        setValue('tags_id', item.tags_id)
        setValue('gift', item.gift)
    }, [categories, brands, tags, items])

    useEffect(() => {
        if(kindOfAction === KIND_OF_ACTION[0].value) {
            setActionTypeName("brands_id")
            getBrands(1, 1000, "", "", "", false)
            setValue("items_id", [])
            setValue("tags_id", [])
            setValue("categories_id", [])
        } else if(kindOfAction === KIND_OF_ACTION[1].value) {
            setActionTypeName("categories_id")
            getCategories(1, 1000, "", "", "", false)
            setValue("items_id", [])
            setValue("tags_id", [])
            setValue("brands_id", [])
        } else if(kindOfAction === KIND_OF_ACTION[2].value) {
            setActionTypeName("tags_id")
            getTags(1, 1000, "", "", "", false)
            setValue("items_id", [])
            setValue("brands_id", [])
            setValue("categories_id", [])
        } else if(kindOfAction === KIND_OF_ACTION[3].value) {
            setActionTypeName("items_id")
            getItems(1, 1000, "", "", "", false)
            setValue("brands_id", [])
            setValue("tags_id", [])
            setValue("categories_id", [])
        } else {
            setActionTypeName("all")
            setValue("items_id", [])
            setValue("brands_id", [])
            setValue("tags_id", [])
            setValue("categories_id", [])
        }
    }, [kindOfAction])

    useEffect(() => {
        if(actionCondition === ACTION_KONDITIONS[2].value) {
            setValue("from_sum_in_bill", 0)
            setValue("from_items_count", null)
        } else if(actionCondition === ACTION_KONDITIONS[0].value) {
            setValue("from_sum_in_bill", item.from_sum_in_bill)
            setValue("from_items_count", null)
        } else {
            setValue("from_items_count", item.from_items_count)
            setValue("from_sum_in_bill", null)
        }
    }, [actionCondition])

    return (
        <Modal title={`Редактировать ${item.title}`} onClose={onClose}>
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
                                    id={0}
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
                                    id={1}
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
                {kindOfAction != 'all' &&
                <div style={{ marginTop: "10px" }}>
                    <Controller
                        name={actionTypeName}
                        control={control}
                        defaultValue={[]}
                        rules={{ required: "Обязательное поле!" }}
                        render={({ field: { onChange, value }, fieldState: { error } }) => (
                            <>
                                <MultiAdminSearch
                                    value={value}
                                    onChange={onChange}
                                    items={
                                        kindOfAction === KIND_OF_ACTION[0].value ? brands :
                                        kindOfAction === KIND_OF_ACTION[1].value ? categories :
                                        kindOfAction === KIND_OF_ACTION[2].value ? tags :
                                        kindOfAction === KIND_OF_ACTION[3].value && items 
                                    }
                                    multiple={true}
                                    label={
                                        kindOfAction === KIND_OF_ACTION[0].value && "Название бренда" ||
                                        kindOfAction === KIND_OF_ACTION[1].value && "Имя категории" ||
                                        kindOfAction === KIND_OF_ACTION[2].value && "Имя тега" ||
                                        kindOfAction === KIND_OF_ACTION[3].value && "Имя товара" 
                                    }
                                    error={error}
                                    setValue={setValue}
                                    name={actionTypeName}
                                    onSearch={
                                        kindOfAction === KIND_OF_ACTION[0].value ? getBrands :
                                        kindOfAction === KIND_OF_ACTION[1].value ? getCategories :
                                        kindOfAction === KIND_OF_ACTION[2].value ? getTags :
                                        kindOfAction === KIND_OF_ACTION[3].value && getItems 
                                    }
                                />
                            </>
                        )}
                    />
                </div>}
                <div>
                    <div style={{ paddingLeft: "10px", boxSizing: "border-box" }}>
                        <CustomCheckbox
                            label="Подарок"
                            checked={isHavingGift}
                            onChange={handleIsHavingGift}
                        />
                    </div>
                    {isHavingGift &&
                        <div style={{ marginTop: "10px" }}>
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
                        </div>
                    }
                </div>
                <Field className={classes.row}>
                    <CustomSelect
                        onChange={e => setActionCondition(e.target.value)}
                        value={actionCondition}
                        label="Условия акции:"
                    >
                        {ACTION_KONDITIONS.map((item, index) => (
                            <MenuItem 
                                key={item.value} 
                                value={item.value}
                                disabled={(index === ACTION_KONDITIONS.length - 1 && isHavingGift)}
                            >
                                {item.label}
                            </MenuItem>
                        ))}
                    </CustomSelect>  
                    <Field>
                        <Controller
                            name={actionCondition === ACTION_KONDITIONS[1].value ? "from_items_count" : "from_sum_in_bill"}
                            control={control}
                            defaultValue=""
                            rules={{ required: "Обязательное поле!" }}
                            render={({ field: { onChange, value }, fieldState: { error } }) => (
                                <AdminInput
                                    onChange={onChange}
                                    value={value}
                                    error={error}
                                    regex="number"
                                    startAdornment={true}
                                    startAdornmentIcon={actionCondition === ACTION_KONDITIONS[1].value ? <FaShoppingBasket/> : <FaMoneyBillAlt/>}
                                    disabled={actionCondition === ACTION_KONDITIONS[2].value}
                                    label={actionCondition === ACTION_KONDITIONS[1].value ? "Кол-во товаров" : "Укажите стартовую сумму в чеке"} 
                                />
                            )}
                        />
                    </Field>
                </Field>
                <div className={classes.footer}>
                    <Button type='submit'>Обновить</Button>
                    <Button onClick={onClose}>Отмена</Button>
                </div>
            </form>
        </Modal>
    )
}

export default AdminEditAction