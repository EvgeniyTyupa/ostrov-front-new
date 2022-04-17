import React from 'react'
import { useTranslation } from 'react-i18next'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { cx } from '../../../../Utils/classnames'
import { discountParser } from '../../../../Utils/discountParser'
import { priceParser } from '../../../../Utils/priceParser'
import ItemCounter from '../../../UI/ItemCounter/ItemCounter'
import classes from './CartItem.module.css'

const CartItem = (props) => {
    const { item, currentLanguage, onChange, type } = props

    let itemName = currentLanguage === "ru" ? item.item.name : item.item.name_ua

    const { t } = useTranslation()

    return (
        <div className={cx(
            classes.item, 
            (type === "mini" || type === "checkout" || type === "gift") ? classes.mini : "",
            type === "result" ? classes.result : ""
        )}>
            <NavLink to={`/item/${itemName}`}>
                {type === "gift" && <label className={classes.baige}>{t("shopping_cart.gift")}</label>}
                <img src={item.item.images[0]} alt="item image"/>
            </NavLink>
            <div className={classes.info}>
                {(item.item.action && item.item.action.from_sum_in_bill === 0 && !item.item.action.from_items_count) ?
                    <span>{priceParser(discountParser(item.item.price, item.item.action.discount).replace(/ /g,''))} грн.</span> :
                    <span>{type === "gift" ? 0 : priceParser(item.item.price)} грн.</span>
                }
                <NavLink to={`/item/${itemName}`}>{itemName}</NavLink>
                {type === "checkout" ? <span>{item.count} шт.</span>
                : type === "gift" ? <span>1 шт.</span> : <ItemCounter item={item} onChange={onChange} type={type}/>}
            </div>
        </div>
    )
}

let mapStateToProps = (state) => ({
    currentLanguage: state.common.currentLanguage
})

export default connect(mapStateToProps, {})(CartItem)