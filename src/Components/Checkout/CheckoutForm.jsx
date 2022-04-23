import { Button, FormControlLabel, IconButton, RadioGroup, Tooltip } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { BsFillQuestionCircleFill } from 'react-icons/bs'
import { MdOutlineAlternateEmail } from 'react-icons/md'
import { connect } from 'react-redux'
import { setDeliveryPrice } from '../../Redux/cartReducer'
import { getCities, getWarehouses } from '../../Redux/commonReducer'
import { createOrderWithMailPost } from '../../Redux/ordersReducer'
import { cx } from '../../Utils/classnames'
import { COURIER_BARRIER, COURIER_DELIVERY_PRICE, OFFICE_MAIL_BARRIER, OFFICE_MAIL_DELIVERY_PRICE } from '../../Utils/constants'
import AddressAutocomplete from '../UI/Form/AddressAutocomplete'
import AdminInput from '../UI/Form/AdminInput'
import CustomCheckbox from '../UI/Form/Checkbox'
import CustomRadio from '../UI/Form/CustomRadio'
import Field from '../UI/Form/Field/Field'
import classes from './CheckoutForm.module.css'

const CheckoutForm = (props) => {
    const { 
        user,
        getWarehouses,
        getCities,
        cities,
        npWarehouses,
        isAuth,
        setDeliveryPrice,
        totalSum,
        actionDiscount,
        gift,
        items,
        userDiscount,
        deliveryPrice,
        createOrderWithMailPost
    } = props

    const { handleSubmit, reset, control, setValue } = useForm()

    const { t } = useTranslation()

    const [receiver, setReceiver] = useState("me")

    const [deliveryType, setDeliveryType] = useState("mailOffice")

    const [currentCity, setCurrentCity] = useState(null)

    const [isOpenComment, setIsOpenComment] = useState(false)

    const [approved, setApproved] = useState(true)

    const handleApproved = () => {
        setApproved(!approved)
    }

    const handleOpenComment = () => {
        setIsOpenComment(!isOpenComment)
    }
  
    const handleReceiver = (e) => {
        setReceiver(e.target.value)
    }

    const handleDeliveryType = (e) => {
        setDeliveryType(e.target.value)
    }

    const onSubmit = (data) => {
        console.log(data)
        data.delivery_type = deliveryType
        data.approved = approved
        data.discount = actionDiscount.includes("%") ? 
            (Number(actionDiscount.replace("%", '')) + userDiscount + "%") 
            : ((((deliveryPrice + totalSum) / 100 * userDiscount) / (deliveryPrice + totalSum) * 100) + Number(actionDiscount))
        
        let total = 
            data.discount.toString().includes("%") ? 
            totalSum - (totalSum / 100 * Number(data.discount.replace("%", ''))) :
            totalSum - data.discount

        data.total = Math.ceil(total)

        data.receiver_info = {
            first_name: data.first_name,
            last_name: data.last_name,
            email: data.email,
            phone: "+380" + data.phone,
            city: data.city,
            warehouse: data.warehouse,
            street: data.street,
            build: data.build,
            appartment: data.appartment
        }

        if(user) {
            data.user = user._id
        }
        
        let cartItems = []

        items.forEach(el => {
            cartItems.push({
                count: el.count,
                item: el.item._id
            })
        })

        data.items = cartItems

        let orderGift = []

        gift.forEach(el => {
            orderGift.push({
                count: 1,
                item: el._id
            })
        })

        data.gift = orderGift

        if(data.payment_type === "receive"){
            createOrderWithMailPost(data)
        }
    }

    useEffect(() => {
        if(user && receiver === "me") {
            setCurrentCity(user.city)
            reset({
                first_name: user.first_name,
                last_name: user.last_name,
                phone: user.phone ? user.phone.substring(4) : "",
                email: user.email,
                city: user.city ? user.city : null,
                warehouse: user.warehouse ? user.warehouse : null,
                payment_type: "receive",
                comment: "",
                street: "",
                build: "",
                appartment: "",
            })
        }if(user && receiver === "other") {
            setCurrentCity(user.city)
            reset({
                first_name: "",
                last_name: "",
                phone: "",
                email: "",
                city: user.city ? user.city : null,
                warehouse: null,
                payment_type: "receive",
                comment: ""
            })
        }else if(!user) {
            reset({
                city: null,
                warehouse: null,
                first_name: "",
                last_name: "",
                phone: "",
                email: "",
                payment_type: "receive",
                comment: "",
                street: "",
                build: "",
                appartment: ""
            })
        }
    }, [user, receiver, deliveryType])

    useEffect(() => {
        if(currentCity && deliveryType === "mailOffice") {
            getWarehouses(currentCity.MainDescription, "")
        }
    }, [currentCity])

    useEffect(() => {
        if(deliveryType === "courier"){
            if(totalSum >= COURIER_BARRIER) {
                setDeliveryPrice(0)
            }else{
                setDeliveryPrice(COURIER_DELIVERY_PRICE)
            }
        }
        if(deliveryType === "mailOffice"){
            if(totalSum >= OFFICE_MAIL_BARRIER) {
                setDeliveryPrice(0)
            }else{
                setDeliveryPrice(OFFICE_MAIL_DELIVERY_PRICE)
            }
        }
    }, [deliveryType, totalSum])

    return (
        <div className={classes.main}>
            <form onSubmit={handleSubmit(onSubmit)}>
                {isAuth &&
                    <>
                        <h4>{t("checkout.receiverType")}</h4>
                        <div className={classes.radioTypes}>
                            <RadioGroup 
                                row 
                                value={receiver} 
                                onChange={handleReceiver}
                                style={{
                                    gap: "45px"
                                }}
                            >
                                <CustomRadio
                                    label={t("checkout.receiverMe")}
                                    labelAlign="end"
                                    value="me"
                                />
                                <CustomRadio
                                    label={t("checkout.receiverOther")}
                                    labelAlign="end"
                                    value="other"
                                />
                            </RadioGroup>
                        </div>
                    </>
                }
                <div className={classes.person}>
                    <h4>{t("checkout.personTitle")}</h4>
                    <div className={classes.fields}>
                        <Field className={classes.row}>
                            <Controller
                                name="first_name"
                                control={control}
                                defaultValue=""
                                rules={{ required: t("errors.required") }}
                                render={({ field: { onChange, value }, fieldState: { error } }) => (
                                    <AdminInput
                                        onChange={onChange}
                                        value={value}
                                        error={error}
                                        label={t("profile.account.name")}  
                                    />
                                )}
                            />
                            <Controller
                                name="last_name"
                                control={control}
                                defaultValue=""
                                rules={{ required: t("errors.required") }}
                                render={({ field: { onChange, value }, fieldState: { error } }) => (
                                    <AdminInput
                                        onChange={onChange}
                                        value={value}
                                        error={error}
                                        label={t("profile.account.form.last_name")}  
                                    />
                                )}
                            />
                        </Field>
                        <Field className={classes.row}>
                            <Controller
                                name="phone"
                                control={control}
                                defaultValue=""
                                rules={{ required: t("errors.required") }}
                                render={({ field: { onChange, value }, fieldState: { error } }) => (
                                    <AdminInput
                                        onChange={onChange}
                                        error={error}
                                        value={value}
                                        regex="number"
                                        startAdornment={true}
                                        startAdornmentIcon={<span>+380</span>}
                                    />
                                )}
                            />
                            <Controller
                                name="email"
                                control={control}
                                defaultValue=""
                                rules={{ 
                                    pattern: {
                                        value: /^[A-Za-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}/,
                                        message: t("errors.email")
                                    }
                                }}
                                render={({ field: { onChange, value }, fieldState: { error } }) => (
                                    <div className={classes.emailContainer}>
                                        <AdminInput
                                            onChange={onChange}
                                            placeholder={t("checkout.notRequired")}
                                            value={value}
                                            error={error}
                                            label={"Email"}
                                            startAdornment={true}
                                            startAdornmentIcon={<MdOutlineAlternateEmail/>}
                                        />
                                    </div>
                                )}
                            />
                        </Field>
                    </div>
                </div>
                <h4>{t("checkout.deliveryType")}</h4>
                <div className={classes.radioTypes}>
                    <RadioGroup 
                        row 
                        value={deliveryType} 
                        onChange={handleDeliveryType}
                        style={{
                            gap: "45px"
                        }}
                    >
                        <CustomRadio
                            label={t("checkout.office")}
                            labelAlign="end"
                            value="mailOffice"
                        />
                        <CustomRadio
                            label={t("checkout.courier")}
                            labelAlign="end"
                            value="courier"
                        />
                    </RadioGroup>
                </div>
                {deliveryType === "mailOffice" && (
                    <div className={classes.mailOffice}>
                        <Field className={classes.field}>
                            <label>{t("profile.account.form.city")}</label>
                            <Controller
                                name="city"
                                control={control}
                                defaultValue={null}
                                rules={{ required: t("errors.required") }}
                                render={({ field: { onChange, value }, fieldState: { error } }) => (
                                    <AddressAutocomplete
                                        value={value}
                                        onChange={onChange}
                                        error={error}
                                        items={cities}
                                        setValue={setValue}
                                        name="city"
                                        disabled={false}
                                        onSearch={getCities}
                                        setCurrentValue={setCurrentCity}
                                        placeholder={t("profile.account.form.city")}
                                    />
                                )}
                            />
                        </Field>
                        <Field className={cx(classes.field, classes.lastField)}>
                            <label>{t("profile.account.form.postNumber")}</label>
                            <Controller
                                name="warehouse"
                                control={control}
                                defaultValue={null}
                                rules={{ required: t("errors.required") }}
                                render={({ field: { onChange, value }, fieldState: { error } }) => (
                                    <AddressAutocomplete
                                        value={value}
                                        error={error}
                                        onChange={onChange}
                                        items={npWarehouses}
                                        setValue={setValue}
                                        name="warehouse"
                                        disabled={currentCity ? false : true}
                                        onSearch={getWarehouses}
                                        city={currentCity}
                                        placeholder={t("profile.account.form.number")}
                                    />
                                )}
                            />
                        </Field>
                    </div>
                )}
                {deliveryType === "courier" && (
                    <div className={classes.courier}>
                        <Field className={classes.field}>
                            <label>{t("profile.account.form.city")}</label>
                            <Controller
                                name="city"
                                control={control}
                                defaultValue={null}
                                rules={{ required: t("errors.required") }}
                                render={({ field: { onChange, value }, fieldState: { error } }) => (
                                    <AddressAutocomplete
                                        value={value}
                                        onChange={onChange}
                                        error={error}
                                        items={cities}
                                        setValue={setValue}
                                        name="city"
                                        disabled={false}
                                        onSearch={getCities}
                                        setCurrentValue={setCurrentCity}
                                        placeholder={t("profile.account.form.city")}
                                    />
                                )}
                            />
                        </Field>
                        <Field className={classes.row}>
                            <Field className={classes.field}>
                                <label>{t("checkout.street")}</label>
                                <Controller
                                    name="street"
                                    control={control}
                                    defaultValue=""
                                    rules={{ required: t("errors.required") }}
                                    render={({ field: { onChange, value }, fieldState: { error } }) => (
                                        <AdminInput
                                            onChange={onChange}
                                            error={error}
                                            value={value}
                                            placeholder={t("checkout.street")}
                                        />
                                    )}
                                /> 
                            </Field>
                            <Field className={classes.field}>
                                <label>{t("checkout.build")}</label>
                                <Controller
                                    name="build"
                                    control={control}
                                    defaultValue=""
                                    rules={{ required: t("errors.required") }}
                                    render={({ field: { onChange, value }, fieldState: { error } }) => (
                                        <AdminInput
                                            onChange={onChange}
                                            error={error}
                                            value={value}
                                            placeholder={t("checkout.build")}
                                        />
                                    )}
                                />    
                            </Field>
                            <Field className={classes.field}>
                                <label>{t("checkout.appartment")}</label>
                                <Controller
                                    name="appartment"
                                    control={control}
                                    defaultValue=""
                                    rules={{ required: t("errors.required") }}
                                    render={({ field: { onChange, value }, fieldState: { error } }) => (
                                        <AdminInput
                                            onChange={onChange}
                                            error={error}
                                            value={value}
                                            placeholder={t("checkout.appartment")}
                                        />
                                    )}
                                />  
                            </Field>
                        </Field>
                    </div>
                )}
                <div className={classes.payment}>
                    <h4>{t("checkout.paymentType")}</h4>
                    <Controller
                        name="payment_type"
                        control={control}
                        defaultValue={"receive"}
                        render={({ field: { onChange, value }, fieldState: { error } }) => (
                            <RadioGroup 
                                row 
                                value={value} 
                                onChange={onChange}
                                style={{
                                    gap: "45px"
                                }}
                            >
                                <div>
                                    <CustomRadio
                                        label={t("checkout.paymentReceive.text")}
                                        labelAlign="end"
                                        value="receive"
                                    />
                                    <Tooltip title={t("checkout.paymentReceive.tooltip")}>
                                        <IconButton
                                            style={{
                                                fontSize: "18px",
                                                color: "#4B5EA3",
                                                padding: 0
                                            }}
                                        >
                                            <BsFillQuestionCircleFill/>
                                        </IconButton>
                                    </Tooltip>
                                </div>
                                <div>
                                    <CustomRadio
                                        label={t("checkout.paymentCreditCard.text")}
                                        labelAlign="end"
                                        value="online"
                                    />
                                    <Tooltip title={t("checkout.paymentCreditCard.tooltip")}>
                                        <IconButton
                                            style={{
                                                fontSize: "18px",
                                                color: "#4B5EA3",
                                                padding: 0
                                            }}
                                        >
                                            <BsFillQuestionCircleFill/>
                                        </IconButton>
                                    </Tooltip>
                                </div>
                            </RadioGroup>
                        )}
                    />         
                </div>
                <div className={classes.comment}>
                    <span onClick={handleOpenComment} className={classes.viewComment}>{t("checkout.addComment")}</span>
                    <div className={cx(classes.commentField, isOpenComment ? classes.openComment : "")}>
                        <Controller
                            name="comment"
                            control={control}
                            defaultValue=""
                            render={({ field: { onChange, value }, fieldState: { error } }) => (
                                <AdminInput
                                    onChange={onChange}
                                    value={value}
                                    error={error}
                                    multiline={true}
                                    rows={6}
                                    placeholder={t("checkout.addCommentPlaceholder")}
                                />
                            )}
                        />
                    </div>
                </div>
                <div className={classes.recall}>
                    <FormControlLabel
                        style={{
                            marginLeft: "0"
                        }}
                        control={
                            <CustomCheckbox 
                                onChange={handleApproved}
                                checked={approved}
                            />
                        } 
                        label={t("checkout.recall")}
                    />
                        <Tooltip title={t("checkout.recallTooltip")}>
                        <IconButton
                            style={{
                                fontSize: "18px",
                                color: "#4B5EA3",
                                padding: 0
                            }}
                        >
                            <BsFillQuestionCircleFill/>
                        </IconButton>
                    </Tooltip>
                </div>
                <Button onClick={handleSubmit(onSubmit)} className={classes.submit}>{t("checkout.submit")}</Button>
            </form>
        </div>
    )
}

let mapStateToProps = (state) => ({
    user: state.user.user,
    cities: state.common.searchingCities,
    npWarehouses: state.common.npWarehouses,
    isAuth: state.user.isAuth,
    totalSum: state.cart.totalSum
})

export default connect(mapStateToProps,{
    getWarehouses,
    getCities,
    setDeliveryPrice,
    createOrderWithMailPost
})(CheckoutForm)