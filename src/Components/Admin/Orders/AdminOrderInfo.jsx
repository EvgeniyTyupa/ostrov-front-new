import React from 'react'
import { NavLink } from 'react-router-dom'
import { cx } from '../../../Utils/classnames'
import { priceParser } from '../../../Utils/priceParser'
import Field from '../../UI/Form/Field/Field'
import Modal from '../../UI/Modal/Modal'
import classes from '../Info.module.css'
import OrderItem from './OrderItem/OrderItem'
import OrderStatusLabel from './StatusLabel/OrderStatusLabel'

const AdminOrderInfo = (props) => {
    const { 
        onClose,
        order
    } = props

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
                    <p>{order.approved ? "Да." : "Нет, требуется консультация."}</p>
                </Field>
                <Field className={classes.row}>
                    <label>Статус:</label>
                    <p><OrderStatusLabel status={order.status}/></p>
                </Field>
                <Field className={classes.row}>
                    <label>Сумма:</label>
                    <p>{priceParser(order.total)} грн.</p>
                </Field>
                <h5>Товары:</h5>
                <div className={classes.itemsList}>
                    {order.items.map(el => (
                        <OrderItem key={el.item._id} item={el}/>
                    ))}
                </div>
                <h5>Подарок:</h5>
                <div className={classes.itemsList}>
                    {order.gift.length > 0 ? order.gift.map(el => (
                        <OrderItem key={el.item._id} item={el}/>
                    )) : <p>Отсутствует.</p>}
                </div>
            </div>
        </Modal>
    )
}

export default AdminOrderInfo