import React from 'react'
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

    return (
        <div className={cx(
            classes.item, 
            (type === "mini" || type === "checkout") ? classes.mini : "",
            type === "result" ? classes.result : ""
        )}>
            <NavLink to={`/item/${itemName}`}>
                <img src={item.item.images[0]} alt="item image"/>
            </NavLink>
            <div className={classes.info}>
                {(item.item.in_action && item.item.from_sum_in_bill === 0 && !item.item.from_items_count) ?
                    <span>{priceParser(discountParser(item.item.price, item.item.discount).replace(/ /g,''))} грн.</span> :
                    <span>{priceParser(item.item.price)} грн.</span>
                }
                <NavLink to={`/item/${itemName}`}>{itemName}</NavLink>
                {type === "checkout" ? <span>{item.count} шт.</span>
                : <ItemCounter item={item} onChange={onChange} type={type}/>}
            </div>
        </div>
    )
}

let mapStateToProps = (state) => ({
    currentLanguage: state.common.currentLanguage
})

export default connect(mapStateToProps, {})(CartItem)