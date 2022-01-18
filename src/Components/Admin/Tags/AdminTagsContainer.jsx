import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { addTag, deleteTag, editTag, getTags, setNewTag, setTagsData } from '../../../Redux/tagsReducer'
import Preloader from '../../Common/Preloader/Preloader'
import AdminLayout from '../../UI/Admin/AdminLayout/AdminLayout'
import AdminTags from './AdminTags'

const AdminTagsContainer = (props) => {
    const { 
        isFetching,
        tags,
        getTags,
        addTag,
        editTag,
        deleteTag,
        serverResponse,
        serverError,
        newTag,
        setNewTag,
        setTagsData,
        total,
        totalIsHg
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

    const handleAddTag = async (data) => {
        await addTag(data)
        handleAddModal()
    }

    const handleDelete = (tagId) => {
        deleteTag(tagId).then(() => {
            const newTags = [...tags]
            newTags.forEach((item, index) => {
                if(item._id === tagId) {
                    newTags.splice(index, 1)
                }
            }) 
            setOpenRemove(false)
            setTagsData(newTags)
        })
    }

    const handleEditTag = async (tagId, data) => {
        await editTag(tagId, data)
    }

    useEffect(() => {
        if(newTag){
            const newTags = [...tags]
            let pushIndex = newTags.length
            newTags.forEach((item, index) => {
                if(item._id === newTag._id) {
                    newTags.splice(index, 1)
                    pushIndex = index
                }
            })
            newTags.splice(pushIndex, 0, newTag)
            setTagsData(newTags)
            setNewTag(null)
        }
    }, [newTag])

    useEffect(() => {
        getTags(pageNumber + 1, pageSize, "", "", "")
    }, [pageSize, pageNumber])

    return (
        <AdminLayout>
            {isFetching && <Preloader/>}
            <AdminTags
                tags={tags}
                getTags={getTags}
                addTag={handleAddTag}
                editTag={handleEditTag}
                deleteTag={handleDelete}
                pageSize={pageSize}
                pageNumber={pageNumber}
                handleChangePage={handleChangePage}
                handlePageSize={handlePageSize}
                searchValue={searchValue}
                setSearchValue={setSearchValue}
                isOpenAddModal={isOpenAddModal}
                handleAddModal={handleAddModal}
                openEdit={openEdit}
                openRemove={openRemove}
                handleRemove={handleRemove}
                handleEdit={handleEdit}
                serverError={serverError}
                serverResponse={serverResponse}
                currentItem={currentItem}
                total={total}
                totalIsHg={totalIsHg}
            />
        </AdminLayout>
    )
}

let mapStateToProps = (state) => ({
    isFetching: state.common.isFetching,
    tags: state.tags.tags,
    serverResponse: state.common.serverResponse,
    serverError: state.common.serverError,
    newTag: state.tags.newTag,
    total: state.tags.total,
    totalIsHg: state.tags.totalIsHg
})

export default connect(mapStateToProps, {
    getTags,
    addTag,
    deleteTag,
    editTag,
    setNewTag,
    setTagsData
})(AdminTagsContainer)