import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { getUsers } from '../../../Redux/userReducer'
import Preloader from '../../Common/Preloader/Preloader'
import AdminLayout from '../../UI/Admin/AdminLayout/AdminLayout'
import AdminUsers from './AdminUsers'

const AdminUsersContainer = (props) => {
    const {
        isFetching,
        users,
        getUsers,
        total
    } = props

    const [pageSize, setPageSize] = useState(20)
    const [pageNumber, setPageNumber] = useState(0)

    const [searchValue, setSearchValue] = useState("")

    const [currentUser, setCurrentUser] = useState(null)

    const handleChangePage = (event, page) => {
        setPageNumber(page)
    }

    const handlePageSize = (event) => {
        setPageSize(event.target.value)
        setPageNumber(0)
    }

    useEffect(() => {
        getUsers(pageNumber + 1, pageSize, "", "", "")
    }, [pageNumber, pageSize])

    return (
        <AdminLayout>
            {isFetching && <Preloader/>}
            <AdminUsers
                users={users}
                getUsers={getUsers}
                total={total}
                pageNumber={pageNumber}
                pageSize={pageSize}
                searchValue={searchValue}
                setSearchValue={setSearchValue}
                handleChangePage={handleChangePage}
                handlePageSize={handlePageSize}
            />
        </AdminLayout>
    )
}

let mapStateToProps = (state) => ({
    isFetching: state.common.isFetching,
    users: state.user.users,
    total: state.user.total
})

export default connect(mapStateToProps, {
    getUsers
})(AdminUsersContainer)