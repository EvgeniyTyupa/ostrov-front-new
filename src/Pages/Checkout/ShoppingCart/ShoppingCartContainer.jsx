import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { setCartItems, setDeliveryPrice } from '../../../Redux/cartReducer'
import { OFFICE_MAIL_DELIVERY_PRICE } from '../../../Utils/constants'
import ShoppingCart from './ShoppingCart'

const ShoppingCartContainer = (props) => {
    const { 
        totalCount,
        totalSum,
        cartItems,
        setCartItems,
        viewedItems,
        deliveryPrice,
        setDeliveryPrice
    } = props

    const [currentTabIndex, setCurrentTabIndex] = useState(0)
    const [currentItem, setCurrentItem] = useState(null)

    const [parsedViewedItems, setParsedViewedItems] = useState([])

    const handleTab = (e, value) => {
        setCurrentTabIndex(value)
    }

    useEffect(() => {
        if(currentItem) {
            let newItems = [...cartItems]
            let isExist = false

            newItems.forEach((el, index) => {
                if(el.item._id === currentItem.item._id) {
                    isExist = true
                    newItems[index] = currentItem
                }
            })
            if(!isExist) {
                newItems.push(currentItem)
            }

            setCartItems(newItems)
        }
    }, [currentItem])

    useEffect(() => {
        if(totalSum >= 500) { 
            setDeliveryPrice(0)
        }
        else { 
            setDeliveryPrice(OFFICE_MAIL_DELIVERY_PRICE)
        }
        
        if(totalCount === 0) {
            setDeliveryPrice(0)
        }
    }, [totalSum])

    useEffect(() => {
        let newItems = []

        viewedItems.forEach(el => {
            newItems.push({
                item: el,
                count: 1
            })
        })

        setParsedViewedItems(newItems)
    }, [viewedItems])

    return (
        <>
            <ShoppingCart
                currentTabIndex={currentTabIndex}
                handleTab={handleTab}
                totalCount={totalCount}
                totalSum={totalSum}
                cartItems={cartItems}
                setCurrentItem={setCurrentItem}
                deliveryPrice={deliveryPrice}
                viewedItems={parsedViewedItems}
            />
        </>
    )
}

let mapStateToProps = (state) => ({
    totalCount: state.cart.totalCount,
    totalSum: state.cart.totalSum,
    cartItems: state.cart.items,
    viewedItems: state.items.viewedItems,
    deliveryPrice: state.cart.deliveryPrice
})

export default connect(mapStateToProps, {
    setCartItems,
    setDeliveryPrice
})(ShoppingCartContainer)