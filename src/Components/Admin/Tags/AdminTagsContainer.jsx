import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { addTag, deleteTag, editTag, getTags } from '../../../Redux/tagsReducer'
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
        serverError
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

    const handleAddTag = (data) => {
        addTag(data)
        if(serverResponse){
            const newTags = [...tags]
            console.log(newTags.length, pageSize)
            if(newTags.length === pageSize) {
                newTags.splice(newTags.length - 2, 1)
            }
        }
    }
    
    useEffect(() => {
        getTags(pageNumber + 1, pageSize, "", "", "")
    }, [pageSize, pageNumber])

    return (
        <AdminLayout>
            {isFetching && <Preloader/>}
            <AdminTags
                tags={tags}
                getTags={getTags}
                addTag={addTag}
                editTag={editTag}
                deleteTag={deleteTag}
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
            />
        </AdminLayout>
    )
}

let mapStateToProps = (state) => ({
    isFetching: state.common.isFetching,
    tags: state.tags.tags,
    serverResponse: state.common.serverResponse,
    serverError: state.common.serverError
})

export default connect(mapStateToProps, {
    getTags,
    addTag,
    deleteTag,
    editTag
})(AdminTagsContainer)