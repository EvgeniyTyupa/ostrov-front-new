import React, { useState } from 'react'
import { connect } from 'react-redux'
import { getNews } from '../../../Redux/newsReducer'
import Preloader from '../../Common/Preloader/Preloader'
import AdminLayout from '../../UI/Admin/AdminLayout/AdminLayout'
import AdminNews from './AdminNews'

const AdminNewsContainer = (props) => {
    const {
        isFetching,
        serverError,
        serverResponse,
        getNews
    } = props

    const [pageSize, setPageSize] = useState(20)
    const [pageNumber, setPageNumber] = useState(0)

    const [searchValue, setSearchValue] = useState("")

    const [isOpenAddModal, setIsOpenAddModal] = useState(false)
    const [openEdit, setOpenEdit] = useState(false)
    const [openRemove, setOpenRemove] = useState(false)

    const [currentItem, setCurrentItem] = useState(null)

    const handleEdit = (item) => {
        setCurrentItem(item)
        setOpenEdit(!openEdit)
    }

    const handleRemove = (item) => {
        setCurrentItem(item)
        setOpenRemove(!openRemove)
    }

    const handleAddModal = () => {
        setIsOpenAddModal(!isOpenAddModal)
    }

    const handleChangePage = (event, page) => {
        setPageNumber(page)
    }

    const handlePageSize = (event) => {
        setPageSize(event.target.value)
        setPageNumber(0)
    }

    return (
        <AdminLayout>
            { isFetching && <Preloader/> }
            <AdminNews
                serverResponse={serverResponse}
                serverError={serverError}
                pageSize={pageSize}
                pageNumber={pageNumber}
                isOpenAddModal={isOpenAddModal}
                handleAddModal={handleAddModal}
                handleChangePage={handleChangePage}
                handlePageSize={handlePageSize}
                handleRemove={handleRemove}
                handleEdit={handleEdit}
                searchValue={searchValue}
                setSearchValue={setSearchValue}
                getNews={getNews}
            />
        </AdminLayout>
    )
}

let mapStateToProps = (state) => ({
    isFetching: state.common.isFetching,
    serverResponse: state.common.serverResponse,
    serverError: state.common.serverError,
})

export default connect(mapStateToProps, {
    getNews
})(AdminNewsContainer)