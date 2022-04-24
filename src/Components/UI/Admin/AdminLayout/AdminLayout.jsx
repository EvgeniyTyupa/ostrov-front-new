import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { getNewOrdersCount, getOrders, subscribeOnOrdersCount } from '../../../../Redux/ordersReducer'
import AdminNav from '../AdminNav/AdminNav'
import AdminSidebar from '../AdminSidebar/AdminSidebar'
import classes from './AdminLayout.module.css'

import { useSound } from 'use-sound'

import newOrderSound from '../../../../Assets/Sound/newOrder.mp3'

const AdminLayout = (props) => {
    const { 
        children, 
        subscribeOnOrdersCount, 
        getNewOrdersCount,
        newOrdersCount,
        getOrders
    } = props

    const [playOn] = useSound( newOrderSound, { volume: .5 });

    const [currentNewOrders, setCurrentNewOrders] = useState(newOrdersCount)

    useEffect(() => {
        if(newOrdersCount > 0 && currentNewOrders < newOrdersCount) {
            setCurrentNewOrders(newOrdersCount)
            playOn()
            getOrders(1, 25, "", "", "", "new,sended,received,canceled,refund")
        }
    }, [newOrdersCount])

    useEffect(() => {
        getNewOrdersCount()
        subscribeOnOrdersCount()
    }, [])

    return (
        <div className={classes.main}>
            <AdminNav/>
            <div className={classes.body}>
                <AdminSidebar/>
                <div className={classes.content}>
                    {children}
                </div>
            </div>
        </div>
    )
}

let mapStateToProps = (state) => ({
    newOrdersCount: state.orders.newTotal
})

export default connect(mapStateToProps, {
    subscribeOnOrdersCount,
    getNewOrdersCount,
    getOrders
})(AdminLayout)