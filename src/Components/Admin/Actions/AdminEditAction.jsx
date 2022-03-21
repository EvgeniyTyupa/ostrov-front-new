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
                <div style={{ marginTop: "10px" }}>
                    <Controller
                        name={actionTypeName}
                        control={control}
                        defaultValue={[]}
                        rules={{ required: "Обязательное поле!" }}
                        render={({ field: { onChange, value }, fieldState: { error } }) => (
                            <MultiAdminSearch
                                value={value}
                                onChange={onChange}
                                items={
                                    kindOfAction === KIND_OF_ACTION[0].value && brands ||
                                    kindOfAction === KIND_OF_ACTION[1].value && categories ||
                                    kindOfAction === KIND_OF_ACTION[2].value && tags ||
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
                                    kindOfAction === KIND_OF_ACTION[0].value && getBrands ||
                                    kindOfAction === KIND_OF_ACTION[1].value && getCategories ||
                                    kindOfAction === KIND_OF_ACTION[2].value && getTags ||
                                    kindOfAction === KIND_OF_ACTION[3].value && getItems 
                                }
                            />
                        )}
                    />
                </div>
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
                        {ACTION_KONDITIONS.map(item => (
                            <MenuItem key={item.value} value={item.value}>{item.label}</MenuItem>
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
                <Button className={classes.submit} type='submit'>Добавить</Button>
            </form>
        </Modal>
    )
}

export default AdminEditAction