import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import classes from './ShoppingCartModal.module.css'

const ShoppingCartModal = (props) => {

    const { t } = useTranslation()

    const [items, setItems] = useState([])

    useEffect(() => {
        let data = localStorage.getItem('shopping_cart')
        let parsed_data = JSON.parse(data)

        setItems(parsed_data)
    }, [])

    return (
        <div className={classes.main}>
            {items ? 
                <div></div>
                : 
                <p className={classes.empty}>{t("shopping_cart.empty")}</p>
            }
        </div>
    )
}


export default ShoppingCartModal