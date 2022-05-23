import { Button } from '@mui/material'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { NavLink } from 'react-router-dom'
import { discountParser } from '../../../../Utils/discountParser'
import { priceParser } from '../../../../Utils/priceParser'
import ItemCounter from '../../../UI/ItemCounter/ItemCounter'
import classes from './CartItemMobile.module.css'

const CartItemMobile = (props) => {
    const { item, currentLanguage, type, setCurrentItem, cartItems } = props

    const { t } = useTranslation()

    let itemName = currentLanguage === "ru" ? item.item.name : item.item.name_ua

    return (
        <div className={classes.main}>
            <div className={classes.top}>
                <NavLink to={`/item/${itemName}`}>
                    {type === "gift" && <label className={classes.baige}>{t("shopping_cart.gift")}</label>}
                    <img src={item.item.images[0]} alt="item image"/>
                </NavLink>
                <div className={classes.itemInfo}>
                    <NavLink to={`/item/${itemName}`}>{itemName}</NavLink>
                    {item.item.brand && <span>{item.item.brand.name}</span>}
                </div>
            </div>
            <div className={classes.bot}>
                {(item.item.action && item.item.action.from_sum_in_bill === 0 && !item.item.action.from_items_count) ?
                    <span className={classes.price}>{priceParser(discountParser(item.item.price, item.item.action.discount).replace(/ /g,''))}<span className={classes.textPrice}> грн.</span></span> :
                    <span className={classes.price}>{type === "gift" ? 0 : priceParser(item.item.price)}<span className={classes.textPrice}> грн.</span></span>
                }
                {type === "cart" && 
                    <ItemCounter
                        type="mini"
                        item={item}
                        onChange={setCurrentItem}
                    />
                }
                {type === "viewed" && 
                    <Button 
                        className={classes.addBut}
                        onClick={() => setCurrentItem(item)}
                        disabled={item.item.count <= 0 || cartItems.find(el => el.item._id === item.item._id)}
                    >
                        {cartItems.find(el => el.item._id === item.item._id) ? t("shopping_cart.added") :
                        item.item.count <= 0 ? t("items.empty") : t("shopping_cart.add")}
                    </Button>
                }
                {type === "cart" && ((item.item.action && item.item.action.from_sum_in_bill === 0 && !item.item.action.from_items_count) ?
                    <span className={classes.price}>{priceParser(discountParser(item.item.price, item.item.action.discount).replace(/ /g,'') * item.count)} <span className={classes.textPrice}>грн.</span></span> :
                    <span className={classes.price}>{priceParser(Number(item.item.price) * item.count)} <span className={classes.textPrice}>грн.</span></span>
                )}
            </div>
        </div>
    )
}
export default CartItemMobile