import { Button } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { connect } from 'react-redux'
import { NavLink, useNavigate } from 'react-router-dom'
import { setAddToCartResult, setCartItems } from '../../../../Redux/cartReducer'
import { priceParser } from '../../../../Utils/priceParser'
import ItemCounter from '../../../UI/ItemCounter/ItemCounter'
import Modal from '../../../UI/Modal/Modal'
import classes from './ShoppingCartResult.module.css'

const ShoppingCartResult = (props) => {
    const {
        items,
        addToCartResult,
        setAddToCartResult,
        currentLanguage,
        setCartItems,
        totalCount,
        totalSum
    } = props

    const { t } = useTranslation()

    const navigate = useNavigate()

    let itemName = currentLanguage === "ru" ? addToCartResult.item.name : addToCartResult.item.name_ua

    const onClose = () => {
        setAddToCartResult(null)
    }

    const handleNavigate = () => {
        setAddToCartResult(null)
        navigate('/shopping_cart')
    }

    useEffect(() => {
        return () => {
            setAddToCartResult(null)
        }
    }, [])

    useEffect(() => {
        if(addToCartResult){
            let newItems = [...items]
            newItems.forEach((el, index) => {
                if(el.item._id === addToCartResult.item._id) {
                    newItems[index] = addToCartResult
                }
            })
            setCartItems(newItems)
        }
    }, [addToCartResult])

    return (
        <Modal title={t("shopping_cart.addToCartResultTitle")} onClose={onClose}>
            <div className={classes.main}>
                <div className={classes.item}>
                    <NavLink to={`/item/${itemName}`}>
                        <img src={addToCartResult.item.images[0]} alt="item image"/>
                    </NavLink>
                    <div className={classes.info}>
                        <NavLink to={`/item/${itemName}`}>{itemName}</NavLink>
                        <ItemCounter item={addToCartResult} onChange={setAddToCartResult}/>
                    </div>
                </div>
                <div className={classes.messageTotal}>
                    <span>{t("shopping_cart.totalResult")}</span>
                    <NavLink to="/shopping_cart">{totalCount},</NavLink>
                    <span>{t("shopping_cart.onSum")}</span>
                    <p>{priceParser(totalSum)} грн.</p>
                </div>
                <Button onClick={handleNavigate} className={classes.navigateBut}>{t("shopping_cart.navigate")}</Button>
            </div>
        </Modal>
    )
}

let mapStateToProps = (state) => ({
    items: state.cart.items,
    totalCount: state.cart.totalCount,
    totalSum: state.cart.totalSum,
    addToCartResult: state.cart.addToCartResult,
    currentLanguage: state.common.currentLanguage
})

export default connect(mapStateToProps, {
    setAddToCartResult,
    setCartItems
})(ShoppingCartResult)