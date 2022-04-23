import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Preloader from '../../../Components/Common/Preloader/Preloader'
import { setServerMessage } from '../../../Redux/commonReducer'
import { setOrderDone } from '../../../Redux/ordersReducer'
import Checkout from './Checkout'

const CheckoutContainer = (props) => {
    const { 
        isFetching,
        totalCount,
        totalSum,
        cartItems,
        deliveryPrice,
        actionDiscount,
        gift,
        user,
        orderDone,
        serverMessage,
        setServerMessage,
        setOrderDone
    } = props

    const navigate = useNavigate()

    const [userDiscount, setUserDiscount] = useState(0)

    const closeOrderDoneModal = () => {
        setOrderDone(false)
        setServerMessage(null)
        navigate('/')
    }

    useEffect(() => {
        let cart_items = localStorage.getItem('shopping_cart')
        let parsed_items = JSON.parse(cart_items)
        if(!parsed_items){
            navigate('/')
        }
    }, [])

    useEffect(() => {
        if(user) {
            setUserDiscount(user.discount ? user.discount : 0)
        }
    }, [user])

    return (
        <>
            {isFetching && <Preloader/>}
            <Checkout
                items={cartItems}
                totalCount={totalCount}
                totalSum={totalSum}
                deliveryPrice={deliveryPrice}
                gift={gift}
                actionDiscount={actionDiscount}
                userDiscount={userDiscount}
                orderDone={orderDone}
                serverMessage={serverMessage}
                closeOrderDoneModal={closeOrderDoneModal}
            />
        </>
    )
}

let mapStateToProps = (state) => ({
    isFetching: state.common.isFetching,
    totalCount: state.cart.totalCount,
    totalSum: state.cart.totalSum,
    cartItems: state.cart.items,
    deliveryPrice: state.cart.deliveryPrice,
    actionDiscount: state.cart.actionDiscount,
    gift: state.cart.gift,
    user: state.user.user,
    orderDone: state.orders.orderDone,
    serverMessage: state.common.serverMessage
})

export default connect(mapStateToProps, {
    setServerMessage,
    setOrderDone
})(CheckoutContainer)