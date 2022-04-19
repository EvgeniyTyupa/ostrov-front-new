import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { getOrders } from '../../../Redux/ordersReducer'
import Preloader from '../../Common/Preloader/Preloader'
import AdminLayout from '../../UI/Admin/AdminLayout/AdminLayout'
import AdminOrders from './AdminOrders'

const AdminOrdersContainer = (props) => {
    const {
        total,
        orders,
        newOrder,
        isFetching,
        getOrders,
        
    } = props

    const [pageSize, setPageSize] = useState(20)
    const [pageNumber, setPageNumber] = useState(0)

    const [searchValue, setSearchValue] = useState("")

    const [currentOrder, setCurrentOrder] = useState(null)

    const [isOpenView, setIsOpenView] = useState(false)

    const handleOpenView = (user) => {
        setCurrentOrder(user)
        setIsOpenView(!isOpenView)
    }

    const handleChangePage = (event, page) => {
        setPageNumber(page)
    }

    const handlePageSize = (event) => {
        setPageSize(event.target.value)
        setPageNumber(0)
    }

    useEffect(() => {
        getOrders(pageNumber + 1, pageSize, "", "", "")
    }, [pageNumber, pageSize])

    return (
        <AdminLayout>
            {isFetching && <Preloader/>}
            <AdminOrders
                pageNumber={pageNumber}
                pageSize={pageSize}
                searchValue={searchValue}
                setSearchValue={setSearchValue}
                orders={orders}
                getOrders={getOrders}
                currentOrder={currentOrder}
                isOpenView={isOpenView}
                handleOpenView={handleOpenView}
            />
        </AdminLayout>
    )
}

let mapStateToProps = (state) => ({
    isFetching: state.common.isFetching,
    orders: state.orders.orders,
    newOrder: state.orders.newOrder,
    total: state.orders.total
})

export default connect(mapStateToProps, {
    getOrders
})(AdminOrdersContainer)