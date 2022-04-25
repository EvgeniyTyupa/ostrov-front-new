import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { getOrdersByUserId } from '../../../Redux/ordersReducer'
import Preloader from '../../Common/Preloader/Preloader'
import MyOrders from './MyOrders'

const MyOrdersContainer = (props) => {
    const { isFetching, orders, user, getOrdersByUserId, total } = props

    const [order, setOrder] = useState('desc');
    const [orderBy, setOrderBy] = useState('created_at');

    const [pageNumber, setPageNumber] = useState(0)
    const [pageSize, setPageSize] = useState(10)

    const [isOpenViewInfo, setIsOpenViewInfo] = useState(false)

    const [currentOrder, setCurrentOrder] = useState(null)

    const handleView = (item) => {
        setCurrentOrder(item)
        setIsOpenViewInfo(!isOpenViewInfo)
    }

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    }

    const createSortHandler = (property) => (event) => {
        handleRequestSort(event, property);
    };

    const handleChangePage = (event, page) => {
        setPageNumber(page)
    }

    const handlePageSize = (event) => {
        setPageNumber(0)
        setPageSize(event.target.value)
    }

    useEffect(() => {
        getOrdersByUserId(user._id, pageNumber + 1, pageSize, orderBy, order)
    }, [pageNumber, pageSize, order, orderBy])

    return (
        <>
            {isFetching && <Preloader/>}
            <MyOrders 
                orders={orders} 
                user={user}
                order={order}
                orderBy={orderBy}
                onRequestSort={createSortHandler}
                pageNumber={pageNumber}
                pageSize={pageSize}
                handleChangePage={handleChangePage}
                handlePageSize={handlePageSize}
                total={total}
                isOpenViewInfo={isOpenViewInfo}
                handleView={handleView}
                currentOrder={currentOrder}
            />
        </>
    )
}

let mapStateToProps = (state) => ({
    user: state.user.user,
    orders: state.orders.orders,
    total: state.orders.total,
    isFetching: state.common.isFetching
})

export default connect(mapStateToProps, {
    getOrdersByUserId
})(MyOrdersContainer)