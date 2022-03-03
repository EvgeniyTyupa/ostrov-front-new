import React, { useState } from 'react'
import { connect } from 'react-redux'
import { addPost, getNews } from '../../../Redux/newsReducer'
import Preloader from '../../Common/Preloader/Preloader'
import AdminLayout from '../../UI/Admin/AdminLayout/AdminLayout'
import AdminNews from './AdminNews'

const AdminNewsContainer = (props) => {
    const {
        isFetching,
        serverError,
        serverResponse,
        getNews,
        news,
        total
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
                openEdit={openEdit}
                openRemove={openRemove}
                handleAddModal={handleAddModal}
                handleChangePage={handleChangePage}
                handlePageSize={handlePageSize}
                handleRemove={handleRemove}
                handleEdit={handleEdit}
                searchValue={searchValue}
                setSearchValue={setSearchValue}
                currentItem={currentItem}
                getNews={getNews}
                news={news}
                total={total}
            />
        </AdminLayout>
    )
}

let mapStateToProps = (state) => ({
    isFetching: state.common.isFetching,
    serverResponse: state.common.serverResponse,
    serverError: state.common.serverError,
    news: state.news.news,
    total: state.news.total
})

export default connect(mapStateToProps, {
    getNews,
    addPost
})(AdminNewsContainer)