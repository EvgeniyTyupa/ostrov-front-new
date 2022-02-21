import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { getActions } from '../../../Redux/actionsReducer'
import Preloader from '../../Common/Preloader/Preloader'
import AdminLayout from '../../UI/Admin/AdminLayout/AdminLayout'
import AdminActions from './AdminActions'

const AdminActionsContainer = (props) => {
    const {
        isFetching,
        getActions,
        actions,
        newAction,
        total
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
            />
        </AdminLayout>
    )
}

let mapStateToProps = (state) => ({
    isFetching: state.common.isFetching,
    actions: state.actions.actions,
    total: state.actions.total,
    newAction: state.actions.newAction
})

export default connect(mapStateToProps, {
    getActions
})(AdminActionsContainer)