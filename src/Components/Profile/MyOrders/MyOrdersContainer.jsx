import React from 'react'
import { connect } from 'react-redux'
import Preloader from '../../Common/Preloader/Preloader'
import MyOrders from './MyOrders'

const MyOrdersContainer = (props) => {
    const { isFetching, orders, user } = props

    return (
        <>
            {isFetching && <Preloader/>}
            <MyOrders orders={orders} user={user}/>
        </>
    )
}

let mapStateToProps = (state) => ({
    user: state.user.user,
    orders: state.orders.orders,
    isFetching: state.common.isFetching
})

export default connect(mapStateToProps, {})(MyOrdersContainer)