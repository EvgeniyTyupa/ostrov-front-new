import React from 'react'
import { useTranslation } from 'react-i18next'
import { NavLink } from 'react-router-dom'
import CheckoutForm from '../../../Components/Checkout/CheckoutForm'
import Breadcrumbs from '../../../Components/Common/Breadcrumbs/Breadcrumbs'
import CartItem from '../../../Components/Common/ShoppingCart/CartItem/CartItem'
import MaxWidthContainer from '../../../Components/UI/Container/MaxWidthContainer/MaxWidthContainer'
import PaddingContainer from '../../../Components/UI/Container/PaddingContainer/PaddingContainer'
import { cx } from '../../../Utils/classnames'
import { discountParser } from '../../../Utils/discountParser'
import { priceParser } from '../../../Utils/priceParser'
import classes from './Checkout.module.css'

const Checkout = (props) => {
    const {
        items,
        totalSum,
        totalCount,
        deliveryPrice,
        actionDiscount,
        gift,
        userDiscount
    } = props

    const { t } = useTranslation()

    let breadcrumbsItems = [
        {
            href: `/shopping_cart`,
            title: t("shopping_cart.cart")
        }
    ]

    return (
        <PaddingContainer>
            <MaxWidthContainer className={classes.main}>
                <Breadcrumbs active={t("checkout.title")} items={breadcrumbsItems}/>
                <div className={classes.sides}>
                    <div className={classes.left}>
                        <CheckoutForm 
                            actionDiscount={actionDiscount} 
                            gift={gift}
                            userDiscount={userDiscount}
                            deliveryPrice={deliveryPrice}
                        />
                    </div>
                    <div className={classes.right}>
                        <div className={classes.card}>
                            <div className={classes.list}>
                                <div className={classes.header}>
                                    <h5>{t("checkout.yourOrder")}</h5>
                                    <NavLink to="/shopping_cart">{t("checkout.edit")}</NavLink>
                                </div>
                                <div className={classes.items}>
                                    {items.map(el => (
                                        <CartItem
                                            type='checkout'
                                            key={el.item._id}
                                            item={el}
                                        />
                                    ))}
                                    {gift.map(el => (
                                        <CartItem
                                            type='gift'
                                            key={el._id}
                                            item={{ item: el }}
                                            gift={gift}
                                        />
                                    ))}
                                </div>
                            </div>
                            <div className={classes.fieldCard}>
                                <span>{t("shopping_cart.totalResultShort")}</span>
                                <p>{totalCount} {gift.length > 0 && `+ ${gift.length}`} <span>шт.</span></p>
                            </div>
                            <div className={classes.fieldCard}>
                                <span>{t("shopping_cart.onSum")}:</span>
                                <p>{priceParser(totalSum)} <span>грн.</span></p>
                            </div>
                            <div className={classes.fieldCard}>
                                <span>{t("shopping_cart.delivery")}:</span>
                                <p>{priceParser(deliveryPrice)} <span>грн.</span></p>
                            </div>
                            <div className={classes.fieldCard}>
                                <span>{t("shopping_cart.discount")}:</span>
                                <p>{priceParser(actionDiscount)} {!actionDiscount.toString().includes("%") && <span>грн.</span>}</p>
                            </div>
                            {userDiscount > 0 && (
                            <div className={classes.fieldCard}>
                                <span>{t("shopping_cart.userDiscount")}:</span>
                                <p>{priceParser(userDiscount)}%</p>
                            </div>)}
                            <div className={cx(classes.fieldCard, classes.fieldTotal)}>
                                <span>{t("shopping_cart.total")}:</span>
                                    <p>{priceParser(
                                        discountParser(
                                            deliveryPrice + totalSum, 
                                            (actionDiscount && actionDiscount.includes("%")) ? 
                                                (Number(actionDiscount.replace("%", '')) + userDiscount + "%") 
                                                : ((((deliveryPrice + totalSum) / 100 * userDiscount) / (deliveryPrice + totalSum) * 100) + Number(actionDiscount))
                                        )
                                    )} 
                                    <span>грн.</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </MaxWidthContainer>
        </PaddingContainer>
    )
}

export default Checkout