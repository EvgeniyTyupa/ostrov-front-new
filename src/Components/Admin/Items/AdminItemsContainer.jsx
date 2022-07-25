import React, { useEffect } from 'react'
import { useState } from 'react';
import { connect } from 'react-redux';
import { getBrands } from '../../../Redux/brandsReducer';
import { getAllCategories } from '../../../Redux/categoryReducer';
import { createItem, deleteItem, getItems, setItemsData, setNewItem, updateItem } from '../../../Redux/itemsReducer';
import { getTags } from '../../../Redux/tagsReducer';
import Preloader from '../../Common/Preloader/Preloader';
import AdminLayout from '../../UI/Admin/AdminLayout/AdminLayout'
import AdminItems from './AdminItems'

const AdminItemsContainer = (props) => {
    const { 
        isFetching,
        items, 
        total,
        brands, 
        categories,
        tags,
        getItems, 
        getBrands, 
        getAllCategories,
        getTags,
        createItem,
        deleteItem,
        updateItem,
        serverError,
        serverResponse,
        setItemsData,
        newItem
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

    const handleAddItem = async (data) => {
        await createItem(data)
    }

    const handleEditItem = async (itemId, data) => {
        await updateItem(itemId, data)
    }

    const handleDeleteItem = (itemId) => {
        deleteItem(itemId).then((status) => {
            if(status) {
                const newItems = [...items]
                newItems.forEach((item, index) => {
                    if(item._id === itemId) {
                        newItems.splice(index, 1)
                    }
                })
                setOpenRemove(false)
                setItemsData(newItems)
            }
        })
    }

    useEffect(() => {
        if(newItem){
            const newItems = [...items]
            let pushIndex = newItems.length
            newItems.forEach((item, index) => {
                if(item._id === newItem._id) {
                    newItems.splice(index, 1)
                    pushIndex = index
                }
            })
            newItems.splice(pushIndex, 0, newItem)
            setItemsData(newItems)
            setNewItem(null)
        }
    }, [newItem])

    useEffect(() => {
        getItems(pageNumber + 1, pageSize, "", "", "", false)
        getBrands(pageNumber + 1, 500, "", "", "")
        getAllCategories(pageNumber + 1, 500, "", "", "")
        getTags(pageNumber + 1, 500, "", "", "")
    }, [newItem, pageSize, pageNumber])

    useEffect(() => {
        if(serverResponse){
            setIsOpenAddModal(false)
        }
    }, [serverResponse])

    return (
        <AdminLayout>
            {isFetching && <Preloader/> }
            <AdminItems
                items={items}
                total={total}
                brands={brands}
                categories={categories}
                tags={tags}
                pageSize={pageSize}
                pageNumber={pageNumber}
                isOpenAddModal={isOpenAddModal}
                handleAddModal={handleAddModal}
                handleChangePage={handleChangePage}
                handlePageSize={handlePageSize}
                handleRemove={handleRemove}
                handleEdit={handleEdit}
                openEdit={openEdit}
                openRemove={openRemove}
                currentItem={currentItem}
                getItems={getItems}
                searchValue={searchValue}
                setSearchValue={setSearchValue}
                createItem={handleAddItem}
                deleteItem={handleDeleteItem}
                editItem={handleEditItem}
                serverResponse={serverResponse}
                serverError={serverError}
                updateItem={updateItem}
            />
        </AdminLayout>
    )
}

let mapStateToProps = (state) => ({
    isFetching: state.common.isFetching,
    items: state.items.items,
    total: state.items.total,
    brands: state.brands.brands,
    categories: state.categories.categories,
    tags: state.tags.tags,
    serverResponse: state.common.serverResponse,
    serverError: state.common.serverError,
    newItem: state.items.newItem
})

export default connect(mapStateToProps, {
    getItems,
    getBrands,
    getAllCategories,
    getTags,
    createItem,
    deleteItem,
    updateItem,
    setItemsData,
    setNewItem
})(AdminItemsContainer)