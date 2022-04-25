import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { useSearchParams } from 'react-router-dom'
import { addAction, deleteAction, editAction, getActions, setActionsData, setNewAction, setTotalActions } from '../../../Redux/actionsReducer'
import { getBrands } from '../../../Redux/brandsReducer'
import { getAllCategoriesForSelect } from '../../../Redux/categoryReducer'
import { getItems } from '../../../Redux/itemsReducer'
import { addPromocode, getPromocodes, setNewPromocode, setPromocodesData, setTotalPromocodes } from '../../../Redux/promocodeReducer'
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
        serverResponse,
        setTotalActions,
        getPromocodes,
        newPromocode,
        promocodes,
        setNewPromocode,
        setTotalPromocodes,
        setPromocodesData,
        totalPromocodes,
        addPromocode
    } = props

    const [pageSize, setPageSize] = useState(20)
    const [pageNumber, setPageNumber] = useState(0)

    const [searchValue, setSearchValue] = useState("")

    const [isOpenAddModal, setIsOpenAddModal] = useState(false)
    const [openEdit, setOpenEdit] = useState(false)
    const [openRemove, setOpenRemove] = useState(false)

    const [isOpenAddPromocode, setIsOpenAddPromocode] = useState(false)

    const [currentItem, setCurrentItem] = useState(null)

    const [isActual, setIsActual] = useState(false)

    const [currentTab, setCurrentTab] = useState(0)

    const [searchParams] = useSearchParams()

    const handleTab = (e, value) => {
        setCurrentTab(value)
    }

    const handleIsActual = () => {
        setIsActual(!isActual)
    }
 
    const handleAddModal = () => {
        setIsOpenAddModal(!isOpenAddModal)
    }

    const handleAddPromocodeModal = () => {
        setIsOpenAddPromocode(!isOpenAddPromocode)
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

    const handleAddPromocode = async (data) => {
        await addPromocode(data)
        handleAddPromocodeModal()
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
            setTotalActions(total - 1)
        })
    }

    useEffect(() => {
        if(newPromocode) {
            const newPromocodes = [...promocodes]
            let pushIndex = newPromocodes.length

            let isUpdate = false

            newPromocodes.forEach((item, index) => {
                if(item._id === newPromocode._id) {
                    newPromocodes.splice(index, 1)
                    pushIndex = index
                    isUpdate = true
                }
            })
            newPromocodes.splice(pushIndex, 0, newPromocode)
            setPromocodesData(newPromocodes)
            setNewPromocode(null)
            if(!isUpdate) {
                setTotalPromocodes(totalPromocodes + 1)
            }
        }
    }, [newPromocode])

    useEffect(() => {
        if(newAction) {
            const newActions = [...actions]
            let pushIndex = newActions.length
            
            let isUpdate = false

            newActions.forEach((item, index) => {
                if(item._id === newAction._id) {
                    newActions.splice(index, 1)
                    pushIndex = index
                    isUpdate = true
                }
            })
            newActions.splice(pushIndex, 0, newAction)
            setActionsData(newActions)
            setNewAction(null)
            if(!isUpdate) {
                setTotalActions(total + 1)
            }
        }
    }, [newAction])

    useEffect(() => {
        getActions(pageNumber + 1, pageSize, "", "", "", isActual)
        getPromocodes(pageSize, pageNumber, "", "", "")
    }, [pageSize, pageNumber, isActual])

    useEffect(() => {
        if(searchParams.get('tab') === "promocode" && searchParams.get('search')) {
            setCurrentTab(1)
            setSearchValue(searchParams.get('search'))
        }
    }, [searchParams])

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
                openRemove={openRemove}
                openEdit={openEdit}
                currentItem={currentItem}
                currentTab={currentTab}
                handleTab={handleTab}
                getPromocodes={getPromocodes}
                isOpenAddPromocode={isOpenAddPromocode}
                handleAddPromocodeModal={handleAddPromocodeModal}
                handleAddPromocode={handleAddPromocode}
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
    newPromocode: state.promocodes.newPromocode,
    promocodes: state.promocodes.promocodes,
    totalPromocodes: state.promocodes.total
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
    setNewAction,
    setTotalActions,
    getPromocodes,
    setPromocodesData,
    setTotalPromocodes,
    setNewPromocode,
    addPromocode
})(AdminActionsContainer)