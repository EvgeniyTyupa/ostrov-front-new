import { Button } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { connect } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { priceParser } from '../../../../Utils/priceParser'
import CartItem from '../CartItem/CartItem'
import classes from './ShoppingCartModal.module.css'
import { setCartItems } from '../../../../Redux/cartReducer'

const ShoppingCartModal = (props) => {
    const {
        cartItems,
        totalCount,
        totalSum,
        setCartItems
    } = props

    const [currentItem, setCurrentItem] = useState(null)

    const { t } = useTranslation()

    const navigate = useNavigate()

    const handleNavigate = () => {
        navigate('/shopping_cart')
    }

    useEffect(() => {
        if(currentItem) {
            let newItems = [...cartItems]
            newItems.forEach((el, index) => {
                if(el.item._id === currentItem.item._id) {
                    newItems[index] = currentItem
                }
            })
            setCartItems(newItems)
        }
    }, [currentItem])

    return (
        <div className={classes.main}>
            {totalCount ? 
                <div className={classes.container}>
                    <div className={classes.itemsList}>
                        {cartItems.map(el => (
                            <CartItem 
                                key={el.item._id} 
                                item={el}
                                type="mini"
                                onChange={setCurrentItem}
                            />
                        ))}
                    </div>
                    <div className={classes.total}>
                        <span>{t("shopping_cart.total")}</span>
                        <p>{priceParser(totalSum)} грн.</p>
                    </div>
                    <Button 
                        className={classes.navigateBut}
                        onClick={handleNavigate}
                    >
                        {t("shopping_cart.navigate")}
                    </Button>
                </div>
                : 
                <p className={classes.empty}>{t("shopping_cart.empty")}</p>
            }
        </div>
    )
}

let mapStateToProps = (state) => ({
    cartItems: state.cart.items,
    totalCount: state.cart.totalCount,
    totalSum: state.cart.totalSum
})

export default connect(mapStateToProps, {
    setCartItems
})(ShoppingCartModal)