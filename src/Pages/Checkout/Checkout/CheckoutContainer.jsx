import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Preloader from '../../../Components/Common/Preloader/Preloader'
import Checkout from './Checkout'

const CheckoutContainer = (props) => {
    const { 
        isFetching,
        totalCount,
        totalSum,
        cartItems,
        deliveryPrice
    } = props

    const navigate = useNavigate()

    useEffect(() => {
        let cart_items = localStorage.getItem('shopping_cart')
        let parsed_items = JSON.parse(cart_items)
        if(!parsed_items){
            navigate('/')
        }
    }, [])

    return (
        <>
            {isFetching && <Preloader/>}
            <Checkout
                items={cartItems}
                totalCount={totalCount}
                totalSum={totalSum}
                deliveryPrice={deliveryPrice}
            />
        </>
    )
}

let mapStateToProps = (state) => ({
    isFetching: state.common.isFetching,
    totalCount: state.cart.totalCount,
    totalSum: state.cart.totalSum,
    cartItems: state.cart.items,
    deliveryPrice: state.cart.deliveryPrice
})

export default connect(mapStateToProps, {

})(CheckoutContainer)