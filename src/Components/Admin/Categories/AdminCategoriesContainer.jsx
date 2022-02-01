import { connect } from "react-redux"
import Preloader from "../../Common/Preloader/Preloader"
import AdminCategories from "./AdminCategories"
import AdminLayout from '../../UI/Admin/AdminLayout/AdminLayout'
import { addCategory, deleteCategory, editCategory, getAllCategories, getAllCategoriesForSelect, setCategoriesData, setNewCategory } from "../../../Redux/categoryReducer"
import { useState } from "react"
import { useEffect } from "react"

const AdminCategoriesContainer = (props) => {
    const {
        isFetching,
        categories,
        getAllCategories,
        addCategory,
        editCategory,
        deleteCategory,
        total,
        newCategory,
        serverResponse,
        serverError,
        setCategoriesData,
        setNewCategory,
        getAllCategoriesForSelect,
        allCategories
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

    const handleAddCategory = async (data) => {
        await addCategory(data)
        handleAddModal()
    }

    const handleEditCategory = async (categoryId, data) => {
        await editCategory(categoryId, data)
    }

    const handleDeleteCategory = (categoryId) => {
        deleteCategory(categoryId).then(() => {
            const newCategories = [...categories]
            newCategories.forEach((item, index) => {
                if(item._id === categoryId) {
                    newCategories.splice(index, 1)
                }
            })
            setOpenRemove(false)
            setCategoriesData(newCategories)
        })
    }

    useEffect(() => {
        if(newCategory){
            const newCategories = [...categories]
            let pushIndex = newCategories.length
            newCategories.forEach((item, index) => {
                if(item._id === newCategory._id) {
                    newCategories.splice(index, 1)
                    pushIndex = index
                }
            })
            newCategories.splice(pushIndex, 0, newCategory)
            setCategoriesData(newCategories)
            setNewCategory(null)
        }
    }, [newCategory])

    useEffect(() => {
        getAllCategories(pageNumber + 1, pageSize, "", "", "")
    }, [pageSize, pageNumber])

    return (
        <AdminLayout>
            {isFetching && <Preloader/>}
            <AdminCategories
                categories={categories}
                getAllCategories={getAllCategories}
                pageSize={pageSize}
                pageNumber={pageNumber}
                handleChangePage={handleChangePage}
                handlePageSize={handlePageSize}
                searchValue={searchValue}
                setSearchValue={setSearchValue}
                isOpenAddModal={isOpenAddModal}
                handleAddModal={handleAddModal}
                handleRemove={handleRemove}
                handleEdit={handleEdit}
                openEdit={openEdit}
                openRemove={openRemove}
                currentItem={currentItem}
                total={total}
                addCategory={handleAddCategory}
                editCategory={handleEditCategory}
                deleteCategory={handleDeleteCategory}
                getAllCategoriesForSelect={getAllCategoriesForSelect}
                allCategories={allCategories}
                serverResponse={serverResponse}
                serverError={serverError}
            />
        </AdminLayout>
    )
}

let mapStateToProps = (state) => ({
    isFetching: state.common.isFetching,
    categories: state.categories.categories,
    total: state.categories.total,
    newCategory: state.categories.newCategory,
    serverResponse: state.common.serverResponse,
    serverError: state.common.serverError,
    allCategories: state.categories.allCategories
})

export default connect(mapStateToProps, {
    getAllCategories,
    addCategory,
    editCategory,
    deleteCategory,
    setCategoriesData,
    setNewCategory,
    getAllCategoriesForSelect
})(AdminCategoriesContainer)