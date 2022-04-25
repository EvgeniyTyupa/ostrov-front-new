import React from 'react'
import { useTranslation } from 'react-i18next'
import { cx } from '../../../Utils/classnames'
import { priceParser } from '../../../Utils/priceParser'
import classes from '../../Admin/Info.module.css'
import OrderItem from '../../Admin/Orders/OrderItem/OrderItem'
import OrderStatusLabel from '../../Admin/Orders/StatusLabel/OrderStatusLabel'
import Field from '../../UI/Form/Field/Field'
import Modal from '../../UI/Modal/Modal'

const MyOrderInfo = (props) => {
    const {
        onClose,
        order
    } = props

    const { t } = useTranslation()

    return (
        <Modal onClose={() => onClose(null)} title={t("profile.orders.info.title") + " №" + order.number}>
            <div className={classes.main}>
                <h4>{t("profile.orders.info.receiverTitle")}</h4>
                <Field className={classes.row}>
                    <label>{t("profile.orders.info.receiverTitle")}:</label>
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
                <h4>{t("profile.orders.info.deliveryTitle")}</h4>
                <Field className={classes.row}>
                    <label>Доставка:</label>
                    <p>{order.delivery_type === "mailOffice" ? t("profile.orders.info.deliveryTypeOffice") : t("profile.orders.info.deliveryTypeCourier")}</p>
                </Field>
                <Field className={classes.row}>
                    <label>{t("profile.orders.info.address")}:</label>
                    <p>{order.receiver_info.city.MainDescription},&nbsp;
                        {order.delivery_type === "mailOffice" ? 
                        order.receiver_info.warehouse.DescriptionRu :
                        t("profile.orders.info.street") + " " + order.receiver_info.street 
                        + " " + order.receiver_info.build + ", " 
                        + "кв." + order.receiver_info.appartment
                    }</p>
                </Field>
                <h4>{t("profile.orders.info.detailsTitle")}</h4>
                <Field className={classes.row}>
                    <label>Заказ подтвержден:</label>
                    <div className={classes.edit}>
                        <p>{order.approved ? t("profile.orders.info.approved") : t("profile.orders.info.not_approved")}</p>
                    </div>
                </Field>
                <Field className={classes.row}>
                    <label>Статус:</label>
                    <div className={classes.status}>
                        <OrderStatusLabel status={order.status}/>
                    </div>
                </Field>
                <Field className={classes.row}>
                    <label>{t("profile.orders.info.sum")}:</label>
                    <div className={classes.status}>
                        <p>{priceParser(order.total)} грн.</p>
                    </div>
                </Field>
                <Field className={classes.row}>
                    <label>Доставка:</label>
                    <p>{order.delivery_price ? order.delivery_price : t("profile.orders.info.free")}</p>
                </Field>
                <Field className={classes.row}>
                    <label>{t("profile.orders.info.discount")}:</label>
                    <p>{order.discount}</p>
                </Field>
                {order.promocode &&
                <Field className={classes.row}>
                    <label>Промокод:</label>
                    <div className={classes.status}>
                        <span>{t("profile.orders.info.discount")} {order.promocode.discount} {order.promocode.discount.includes("%") ? "" : "грн."}</span>
                    </div>
                </Field>}
                <Field className={classes.row}>
                    <label>{t("profile.orders.info.totalLabel")}:</label>
                    <div className={classes.status}>
                        <p className={classes.totalPrice}>{priceParser(order.finaly_sum)}
                            <span>&nbsp;грн.</span>
                        </p>
                        <OrderStatusLabel status={order.is_paid}/>
                    </div>
                </Field>
                <Field className={classes.row}>
                    <label>Тип оплаты:</label>
                    <p>{order.payment_type === "receive" ? t("profile.orders.info.onPlacePayment") : "Онлайн."}</p>
                </Field>
                <h4>{t("profile.orders.info.goods")}:</h4>
                <div className={classes.itemsList}>
                    {order.items.map(el => (
                        <OrderItem key={el.item._id} item={el}/>
                    ))}
                </div>
                {(order.gift && order.gift.length) > 0 &&
                <>
                    <h4>{t("profile.orders.info.gift")}:</h4>
                    <div className={classes.itemsList}>
                        {order.gift.map(el => (
                            <OrderItem key={el.item._id} item={el}/>
                        ))}
                    </div>
                </>}
                {order.comment && 
                    <>
                        <h5>Комментарий к заказу:</h5>
                        <div>
                            {order.comment.split("\n").map(el => (
                                <p key={el}>{el}</p>
                            ))}
                        </div>
                    </>
                }
            </div>
        </Modal>
    )
}

export default MyOrderInfo