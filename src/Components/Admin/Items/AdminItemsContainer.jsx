import React, { useEffect } from 'react'
import { useState } from 'react';
import { connect } from 'react-redux';
import { getBrands } from '../../../Redux/brandsReducer';
import { getAllCategories } from '../../../Redux/categoryReducer';
import { createItem, deleteItem, getItems } from '../../../Redux/itemsReducer';
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
        deleteItem
    } = props

    const [pageSize, setPageSize] = useState(20)
    const [pageNumber, setPageNubmer] = useState(0)

    const [searchValue, setSearchValue] = useState("")

    const [isOpenAddModal, setIsOpenAddModal] = useState(false)

    const handleAddModal = () => {
        setIsOpenAddModal(!isOpenAddModal)
    }

    const handleChangePage = (event, page) => {
        setPageNubmer(page)
    }

    const handlePageSize = (event) => {
        setPageSize(event.target.value)
        setPageNubmer(0)
    }

    useEffect(() => {
        getItems(pageNumber + 1, pageSize, "", "", "")
        getBrands(pageNumber + 1, pageSize, "", "", "")
        getAllCategories(pageNumber + 1, pageSize, "", "", "")
        getTags(pageNumber + 1, pageSize, "", "", "")
    }, [pageSize, pageNumber])

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
                getItems={getItems}
                searchValue={searchValue}
                setSearchValue={setSearchValue}
                createItem={createItem}
                deleteItem={deleteItem}
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
    tags: state.tags.tags
})

export default connect(mapStateToProps, {
    getItems,
    getBrands,
    getAllCategories,
    getTags,
    createItem,
    deleteItem
})(AdminItemsContainer)