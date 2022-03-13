import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { addPost, deleteNews, editNews, getNews, setNewNews, setNewsData } from '../../../Redux/newsReducer'
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
        total,
        addPost,
        newNews,
        setNewNews,
        setNewsData,
        deleteNews,
        editNews
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

    const handleAddPost = async (data) => {
        await addPost(data)
        handleAddModal()
    }

    const handleEditPost = async (newsId, data) => {
        await editNews(newsId, data)
    }

    const handleDelete = (newsId) => {
        deleteNews(newsId).then(() => {
            const newPosts = [...news]
            newPosts.forEach((item, index) => {
                if(item._id = newsId) {
                    newPosts.splice(index, 1)
                }
            })
            setOpenRemove(false)
            setNewsData(newPosts)
        })
    }

    useEffect(() => {
        if(newNews){
            const newPosts = [...news]
            let pushIndex = newPosts.length
            newPosts.forEach((item, index) => {
                if(item._id === newNews._id) {
                    newPosts.splice(index, 1)
                    pushIndex = index
                }
            })
            newPosts.splice(pushIndex, 0, newNews)
            setNewsData(newPosts)
            setNewNews(null)
        }
    }, [newNews])

    useEffect(() => {
        getNews(pageNumber + 1, pageSize, "", "", "")
    }, [pageSize, pageNumber])

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
                handleAddPost={handleAddPost}
                deleteNews={handleDelete}
                editNews={handleEditPost}
            />
        </AdminLayout>
    )
}

let mapStateToProps = (state) => ({
    isFetching: state.common.isFetching,
    serverResponse: state.common.serverResponse,
    serverError: state.common.serverError,
    news: state.news.news,
    total: state.news.total,
    newNews: state.news.newNews
})

export default connect(mapStateToProps, {
    getNews,
    addPost,
    setNewsData,
    setNewNews,
    deleteNews,
    editNews
})(AdminNewsContainer)