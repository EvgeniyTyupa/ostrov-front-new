import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { cx } from '../../../Utils/classnames'
import { priceParser } from '../../../Utils/priceParser'
import Field from '../../UI/Form/Field/Field'
import Modal from '../../UI/Modal/Modal'
import classes from '../Info.module.css'
import moment from 'moment'

const AdminUserInfo = (props) => {
    const { 
        onClose,
        user,
        account,
        updateUser
    } = props

    const [discount, setDiscount] = useState(user.discount ? user.discount : 0)

    const handleDiscount = (e) => {
        let value = Number(e.target.value.replace(/[^0-9]/g, ''))
        if(value >= 0 && value <= 100) {
            setDiscount(value)
        }
    }

    const [isOpenEditDiscount, setIsOpenEditDiscount] = useState(false)

    const handleEditDiscount = () => {
        setIsOpenEditDiscount(!isOpenEditDiscount)
    }

    const updateDiscount = async () => {
        await updateUser(user._id, {
            ...user,
            discount: discount
        })
        handleEditDiscount()
    }

    const updateStatus = () => {
        updateUser(user._id, {
            ...user,
            is_blocked: !user.is_blocked
        })
    }

    useEffect(() => {
        if(user.discount){
            setDiscount(user.discount)
        }
    }, [user])

    return (
        <Modal title={`Пользователь ${user.email}`} onClose={() => onClose(null)}>
            <div className={classes.main}>
                <Field className={classes.row}>
                    <label>Тип:</label>
                    <p>{user.adminLevel < 1 ? "Клиент" : user.adminLevel === 1 ? "Менеджер" : "Администратор"}</p>
                </Field>
                <Field className={classes.row}>
                    <label>Имя:</label>
                    <p>{user.first_name ? user.first_name : "Отсутствует"}</p>
                </Field>
                <Field className={classes.row}>
                    <label>Фамилия:</label>
                    <p>{user.last_name ? user.last_name : "Отсутствует"}</p>
                </Field>
                <Field className={cx(classes.row, classes.email)}>
                    <label>Email:</label>
                    <p>{user.email}</p>
                </Field>
                <Field className={classes.row}>
                    <label>Телефон:</label>
                    <p>{user.phone ? user.phone : "Отсутствует"}</p>
                </Field>
                <Field className={classes.row}>
                    <label>Город:</label>
                    <p>{user.city ? user.city.MainDescription : "Отсутствует"}</p>
                </Field>
                <Field className={classes.row}>
                    <label>Адрес отделения НП:</label>
                    <p>{user.warehouse ? user.warehouse.DescriptionRu : "Отсутствует"}</p>
                </Field>
                <Field className={classes.row}>
                    <label>Денег потрачено:</label>
                    <p>{user.money_spend ? priceParser(user.money_spend) : "0"} грн.</p>
                </Field>
                <Field className={classes.row}>
                    <label>Персональная скидка:</label>
                    {isOpenEditDiscount ?
                        <div className={classes.edit}>
                            <input value={discount} onChange={handleDiscount}/>
                            <button onClick={handleEditDiscount}>Отменить</button>
                            <button className={classes.save} onClick={updateDiscount}>Сохранить</button>
                        </div>
                    :
                        <div className={classes.edit}>
                            <p>{user.discount ? user.discount + "%" : "0%"}</p>
                            <button onClick={handleEditDiscount}>Редактировать</button>
                        </div>
                    }
                </Field>
                <Field className={classes.row}>
                    <label>Статус:</label>
                    {user.adminLevel < account.adminLevel ?
                        <div className={classes.edit}>
                            <button className={classes.save} onClick={updateStatus}>{user.is_blocked ? "Заблокирован" : "Не заблокирован"}</button>
                        </div>
                        : <p>{user.is_blocked ? "Заблокирован" : "Не заблокирован"}</p>
                    }
                </Field>
                <Field className={classes.row}>
                    <label>Дата регистрации:</label>
                    <p>{moment(user.created_at).format("DD/MM/YYYY")}</p>
                </Field>
            </div>
        </Modal>
    )
}

let mapStateToProps = (state) => ({
    account: state.user.user
})

export default connect(mapStateToProps, {})(AdminUserInfo)