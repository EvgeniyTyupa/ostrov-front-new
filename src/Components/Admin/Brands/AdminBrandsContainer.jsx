import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { connect } from 'react-redux'
import { addBrand, deleteBrand, editBrand, getBrands, setBrandsData, setNewBrand } from '../../../Redux/brandsReducer'
import Preloader from '../../Common/Preloader/Preloader'
import AdminLayout from '../../UI/Admin/AdminLayout/AdminLayout'
import AdminBrands from './AdminBrands'

const AdminBrandsContainer = (props) => {
    const {
        isFetching,
        getBrands,
        addBrand,
        editBrand,
        deleteBrand,
        brands,
        total,
        newBrand,
        setBrandsData,
        setNewBrand,
        serverResponse,
        serverError,
    } = props

    const [pageSize, setPageSize] = useState(20)
    const [pageNumber, setPageNumber] = useState(0)

    const [searchValue, setSearchValue] = useState("")

    const [isOpenAddModal, setIsOpenAddModal] = useState(false)
    const [openEdit, setOpenEdit] = useState(false)
    const [openRemove, setOpenRemove] = useState(false)

    const [currentItem, setCurrentItem] = useState(null)

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

    const handleAddBrand = async (data) => {
        await addBrand(data)
        handleAddModal()
    }

    const handleEditBrand = async (brandId, data) => {
        await editBrand(brandId, data)
    }

    const handleDelete = (brandId) => {
        deleteBrand(brandId).then(() => {
            const newBrands = [...brands]
            newBrands.forEach((item, index) => {
                if(item._id === brandId){
                    newBrands.splice(index, 1)
                }
            })
            setOpenRemove(false)
            setBrandsData(newBrands)
        })
    }

    useEffect(() => {
        if(newBrand){
            const newBrands = [...brands]
            let pushIndex = newBrands.length
            newBrands.forEach((item, index) => {
                if(item._id === newBrand._id){
                    newBrands.splice(index, 1)
                    pushIndex = index
                }
            })
            newBrands.splice(pushIndex, 0, newBrand)
            setBrandsData(newBrands)
            setNewBrand(null)
        }
    }, [newBrand])

    useEffect(() => {
        getBrands(pageNumber + 1, pageSize, "", "", "")
    }, [pageSize, pageNumber])

    return (
        <AdminLayout>
            {isFetching && <Preloader/>}
            <AdminBrands
                brands={brands}
                pageSize={pageSize}
                pageNumber={pageNumber}
                handleChangePage={handleChangePage}
                handlePageSize={handlePageSize}
                getBrands={getBrands}
                searchValue={searchValue}
                setSearchValue={setSearchValue}
                isOpenAddModal={isOpenAddModal}
                handleAddModal={handleAddModal}
                handleRemove={handleRemove}
                handleEdit={handleEdit}
                openEdit={openEdit}
                openRemove={openRemove}
                total={total}
                currentItem={currentItem}
                addBrand={handleAddBrand}
                editBrand={handleEditBrand}
                deleteBrand={handleDelete}
                serverError={serverError}
                serverResponse={serverResponse}
            />
        </AdminLayout>
    )
}

let mapStateToProps = (state) => ({
    isFetching: state.common.isFetching,
    brands: state.brands.brands,
    total: state.brands.total,
    newBrand: state.brands.newBrand,
    serverResponse: state.common.serverResponse,
    serverError: state.common.serverError,
})

export default connect(mapStateToProps, {
    getBrands,
    addBrand,
    editBrand,
    deleteBrand,
    setBrandsData,
    setNewBrand
})(AdminBrandsContainer)