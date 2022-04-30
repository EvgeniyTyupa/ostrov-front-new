import { MenuItem } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { useOrderStatuses } from '../../../Hooks/useOrderStatuses'
import { setNewTotal } from '../../../Redux/ordersReducer'
import { cx } from '../../../Utils/classnames'
import { priceParser } from '../../../Utils/priceParser'
import Field from '../../UI/Form/Field/Field'
import CustomSelect from '../../UI/Form/Select'
import Modal from '../../UI/Modal/Modal'
import classes from '../Info.module.css'
import OrderItem from './OrderItem/OrderItem'
import OrderStatusLabel from './StatusLabel/OrderStatusLabel'

const useStyles = makeStyles((theme) => ({
    root: {
        color: "white",
        fontFamily: "Montserrat",
        "&:hover": {
            opacity: .7,
            transitionDuration: ".3s"
        }
    }
}));

const AdminOrderInfo = (props) => {
    const { 
        onClose,
        order,
        updateOrder,
        newOrdersCount,
        setNewTotal
    } = props

    const statuses = useOrderStatuses()

    const material = useStyles()

    const [newStatus, setNewStatus] = useState(order.status)
    const [paid, setPaid] = useState(order.is_paid ? "paid" : "not_paid")

    const updateApprove = () => {
        updateOrder(order._id, { approved: true })
    }

    const handleStatus = (value) => {
        setNewStatus(value)
        if(order.status === "new") {
            setNewTotal(newOrdersCount - 1)
        }
        updateOrder(order._id, { status: value })
    }

    const handlePaid = (value) => {
        setPaid(value)
        updateOrder(order._id, { is_paid: !order.is_paid })
    }

    return (
        <Modal onClose={() => onClose(null)} title={`Заказ №${order.number}`}>
            <div className={classes.main}>
                {order.user &&
                    <Field className={classes.row}>
                        <label>Пользователь:</label>
                        <NavLink to={`/admin/users?user=${order.user._id}`}>
                            {order.user.first_name ? order.user.first_name : ""}
                            &nbsp;
                            {order.user.last_name ? order.user.last_name : ""}
                        </NavLink>
                    </Field>
                }
                <h4>Данные о получателе</h4>
                <Field className={classes.row}>
                    <label>Имя:</label>
                    <p>{order.receiver_info.first_name} {order.receiver_info.last_name}</p>
                </Field>
                <Field className={cx(classes.row, classes.email)}>
                    <label>Email:</label>
                    <p>{order.receiver_info.email ? order.receiver_info.email : "Не указан"}</p>
                </Field>
                <Field className={classes.row}>
                    <label>Телефон:</label>
                    <p>{order.receiver_info.phone}</p>
                </Field>
                <h4>Данные о доставке</h4>
                <Field className={classes.row}>
                    <label>Доставка:</label>
                    <p>{order.delivery_type === "mailOffice" ? "на отделение Новой Почты" : "курьером"}</p>
                </Field>
                <Field className={classes.row}>
                    <label>Адрес:</label>
                    <p>{order.receiver_info.city.MainDescription},&nbsp;
                        {order.delivery_type === "mailOffice" ? 
                        order.receiver_info.warehouse.DescriptionRu :
                        "ул." + " " + order.receiver_info.street 
                        + " " + order.receiver_info.build + ", " 
                        + "кв." + order.receiver_info.appartment
                    }</p>
                </Field>
                <h4>Детали заказа</h4>
                <Field className={classes.row}>
                    <label>Заказ подтвержден:</label>
                    <div className={classes.edit}>
                        <p>{order.approved ? "Да." : "Нет, требуется консультация."}</p>
                        {!order.approved && <button className={classes.save} onClick={updateApprove}>Подтвердить</button>}
                    </div>
                </Field>
                <Field className={classes.row}>
                    <label>Статус:</label>
                    <div className={classes.status}>
                        <CustomSelect value={newStatus} onChange={(e) => handleStatus(e.target.value)}>
                            <MenuItem value={statuses[0].value} disabled classes={material}>
                                <OrderStatusLabel status={statuses[0].value}/>
                            </MenuItem>
                            <MenuItem value={statuses[1].value} classes={material}>
                                <OrderStatusLabel status={statuses[1].value}/>
                            </MenuItem>
                            <MenuItem value={statuses[2].value} classes={material}>
                                <OrderStatusLabel status={statuses[2].value}/>    
                            </MenuItem>
                            <MenuItem value={statuses[3].value} classes={material}>
                                <OrderStatusLabel status={statuses[3].value}/>
                            </MenuItem>
                            <MenuItem value={statuses[4].value} classes={material}>
                                <OrderStatusLabel status={statuses[4].value}/>    
                            </MenuItem>
                        </CustomSelect>
                    </div>
                </Field>
                <Field className={classes.row}>
                    <label>Сумма:</label>
                    <div className={classes.status}>
                        <p>{priceParser(order.total)} грн.</p>
                    </div>
                </Field>
                <Field className={classes.row}>
                    <label>Доставка:</label>
                    <p>{order.delivery_price ? order.delivery_price : "Бесплатно."}</p>
                </Field>
                <Field className={classes.row}>
                    <label>Скидка:</label>
                    <p>{order.discount.toString().includes('%') ? order.discount : order.discount + "%"}</p>
                </Field>
                {order.promocode &&
                <Field className={classes.row}>
                    <label>Промокод:</label>
                    <div className={classes.status}>
                        <NavLink to={`/admin/actions?tab=promocode&search=${order.promocode.name}`}>
                            {order.promocode.name}
                        </NavLink>
                        <span>- {order.promocode.discount} {order.promocode.discount.includes("%") ? "" : "грн."}</span>
                    </div>
                </Field>}
                <Field className={classes.row}>
                    <label>Итого:</label>
                    <div className={classes.status}>
                        <p className={classes.totalPrice}>{priceParser(order.finaly_sum)}
                            <span>&nbsp;грн.</span>
                        </p>
                        <CustomSelect value={paid} onChange={(e) => handlePaid(e.target.value)}>
                            <MenuItem value={statuses[5].value} classes={material}>
                                <OrderStatusLabel status={statuses[5].value}/>  
                            </MenuItem>
                            <MenuItem value={statuses[6].value} classes={material}>
                                <OrderStatusLabel status={statuses[6].value}/>  
                            </MenuItem>
                        </CustomSelect>
                    </div>
                </Field>
                <Field className={classes.row}>
                    <label>Тип оплаты:</label>
                    <p>{order.payment_type === "receive" ? "Наложенный платеж." : "Онлайн."}</p>
                </Field>
                <h4>Товары:</h4>
                <div className={classes.itemsList}>
                    {order.items.map(el => (
                        <OrderItem key={el.item._id} item={el}/>
                    ))}
                </div>
                <h4>Подарок:</h4>
                <div className={classes.itemsList}>
                    {order.gift.length > 0 ? order.gift.map(el => (
                        <OrderItem key={el.item._id} item={el}/>
                    )) : <p>Отсутствует.</p>}
                </div>
                <h5>Комментарий к заказу:</h5>
                <div>
                    {order.comment ? order.comment.split("\n").map(el => (
                        <p key={el}>{el}</p>
                    )) : <p>Отсутствует.</p>}
                </div>
            </div>
        </Modal>
    )
}

let mapStateToProps = (state) => ({
    newOrdersCount: state.orders.newTotal
})

export default connect(mapStateToProps, {
    setNewTotal
})(AdminOrderInfo)