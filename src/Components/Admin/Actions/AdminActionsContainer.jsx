import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { addAction, deleteAction, editAction, getActions, setActionsData, setNewAction } from '../../../Redux/actionsReducer'
import { getBrands } from '../../../Redux/brandsReducer'
import { getAllCategoriesForSelect } from '../../../Redux/categoryReducer'
import { getItems } from '../../../Redux/itemsReducer'
import { getTags } from '../../../Redux/tagsReducer'
import Preloader from '../../Common/Preloader/Preloader'
import AdminLayout from '../../UI/Admin/AdminLayout/AdminLayout'
import AdminActions from './AdminActions'

const AdminActionsContainer = (props) => {
    const {
        isFetching,
        getActions,
        actions,
        newAction,
        total,
        items,
        categories,
        brands,
        tags,
        getItems,
        getAllCategoriesForSelect,
        getBrands,
        getTags,
        addAction,
        editAction,
        deleteAction,
        setActionsData,
        setNewAction,
        serverError,
        serverResponse
    } = props

    const [pageSize, setPageSize] = useState(20)
    const [pageNumber, setPageNumber] = useState(0)

    const [searchValue, setSearchValue] = useState("")

    const [isOpenAddModal, setIsOpenAddModal] = useState(false)
    const [openEdit, setOpenEdit] = useState(false)
    const [openRemove, setOpenRemove] = useState(false)

    const [currentItem, setCurrentItem] = useState(null)

    const [isActual, setIsActual] = useState(false)

    const handleIsActual = () => {
        setIsActual(!isActual)
    }
 
    const handleAddModal = () => {
        setIsOpenAddModal(!isOpenAddModal)
    }

    const handleEdit = (item) => {
        setCurrentItem(item)
        setOpenEdit(!openEdit)
    }

    const handleRemove = (item) => {
        setCurrentItem(item)
        setOpenRemove(!openRemove)
    }

    const handleChangePage = (event, page) => {
        setPageNumber(page)
    }

    const handlePageSize = (event) => {
        setPageSize(event.target.value)
        setPageNumber(0)
    }

    const handleAddAction = async (data) => {
        await addAction(data)
        handleAddModal()
    }

    const handleEditAction = async (actionId, data) => {
        await editAction(actionId, data)
    }

    const handleDelete = (actionId) => {
        deleteAction(actionId).then(() => {
            const newActions = [...actions]
            newActions.forEach((item, index) => {
                if(item._id == actionId) {
                    newActions.splice(index, 1)
                }
            })
            setOpenRemove(false)
            setActionsData(newActions)
        })
    }

    useEffect(() => {
        if(newAction) {
            const newActions = [...actions]
            let pushIndex = newActions.length
            newActions.forEach((item, index) => {
                if(item._id === newAction._id) {
                    newAction.splice(index, 1)
                    pushIndex = index
                }
            })
            newActions.splice(pushIndex, 0, newAction)
            setActionsData(newActions)
            setNewAction(null)
        }
    }, [newAction])

    useEffect(() => {
        getActions(pageNumber + 1, pageSize, "", "", "", isActual)
    }, [pageSize, pageNumber, isActual])

    console.log(actions)

    return (
        <AdminLayout>
            {isFetching && <Preloader/>}
            <AdminActions
                pageSize={pageSize}
                actions={actions}
                pageNumber={pageNumber}
                setSearchValue={setSearchValue}
                searchValue={searchValue}
                handleChangePage={handleChangePage}
                handlePageSize={handlePageSize}
                getActions={getActions}
                handleAddModal={handleAddModal}
                handleRemove={handleRemove}
                handleEdit={handleEdit}
                isOpenAddModal={isOpenAddModal}
                total={total}
                isActual={isActual}
                handleIsActual={handleIsActual}
                items={items}
                brands={brands}
                categories={categories}
                tags={tags}
                getItems={getItems}
                getAllCategoriesForSelect={getAllCategoriesForSelect}
                getBrands={getBrands}
                getTags={getTags}
                addAction={handleAddAction}
                editAction={handleEditAction}
                deleteAction={handleDelete}
                serverError={serverError}
                serverResponse={serverResponse}
            />
        </AdminLayout>
    )
}

let mapStateToProps = (state) => ({
    isFetching: state.common.isFetching,
    actions: state.actions.actions,
    total: state.actions.total,
    newAction: state.actions.newAction,
    items: state.items.items,
    brands: state.brands.brands,
    categories: state.categories.allCategories,
    tags: state.tags.tags,
    serverResponse: state.common.serverResponse,
    serverError: state.common.serverError,
})

export default connect(mapStateToProps, {
    getActions,
    getItems,
    getTags,
    getBrands,
    getAllCategoriesForSelect,
    addAction,
    editAction,
    deleteAction,
    setActionsData,
    setNewAction
})(AdminActionsContainer)