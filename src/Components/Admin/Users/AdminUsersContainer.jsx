import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { useSearchParams } from 'react-router-dom'
import { addAdmin, getAdmins, getUser, getUsers, removeAdmin, setNewUser, setUsersData, updateSomeUser } from '../../../Redux/userReducer'
import Preloader from '../../Common/Preloader/Preloader'
import AdminLayout from '../../UI/Admin/AdminLayout/AdminLayout'
import AdminUsers from './AdminUsers'

const AdminUsersContainer = (props) => {
    const {
        isFetching,
        users,
        getUsers,
        total,
        updateSomeUser,
        newUser,
        setNewUser,
        setUsersData,
        getAdmins,
        getUser,
        admin,
        addAdmin,
        removeAdmin,
        serverError,
        serverResponse
    } = props

    const [pageSize, setPageSize] = useState(20)
    const [pageNumber, setPageNumber] = useState(0)

    const [searchValue, setSearchValue] = useState("")

    const [currentUser, setCurrentUser] = useState(null)

    const [isOpenView, setIsOpenView] = useState(false)
    const [isOpenAddAdmin, setIsOpenAddAdmin] = useState(false)
    const [isOpenRemove, setIsOpenRemove] = useState(false)

    const [onlyAdmins, setOnlyAdmins] = useState(false)

    const [searchParams] = useSearchParams()

    const handleOnlyAdmins = () => {
        setOnlyAdmins(!onlyAdmins)
    }

    const handleOpenAddAdmin = () => {
        setIsOpenAddAdmin(!isOpenAddAdmin)
    }

    const handleRemove = (user) => {
        setCurrentUser(user)
        setIsOpenRemove(!isOpenRemove)
    }

    const handleOpenView = (user) => {
        setCurrentUser(user)
        setIsOpenView(!isOpenView)
    }

    const handleChangePage = (event, page) => {
        setPageNumber(page)
    }

    const handlePageSize = (event) => {
        setPageSize(event.target.value)
        setPageNumber(0)
    }

    const handleAddAdmin = async (data) => {
        await addAdmin(data)
        setIsOpenAddAdmin(false)
    }

    const handleDeleteAdmin = (adminId) => {
        removeAdmin(adminId).then(() => {
            const newUsers = [...users]
            newUsers.forEach((item, index) => {
                if(item._id === adminId){
                    newUsers.splice(index, 1)
                }
            })
            setIsOpenRemove(false)
            setUsersData(newUsers)
        })
    }

    const updateUser = async (userId, data) => {
        await updateSomeUser(userId, data)
    }

    useEffect(() => {
        if(newUser) {
            const newUsers = [...users]
            let pushIndex = newUsers.length
            newUsers.forEach((item, index) => {
                if(item._id === newUser._id){
                    newUsers.splice(index, 1)
                    pushIndex = index
                }
            })
            newUsers.splice(pushIndex, 0, newUser)
            setCurrentUser(newUser)
            setUsersData(newUsers)
            setNewUser(null)
        }
    }, [newUser])

    useEffect(() => {
        if(searchParams.get('user')) {
            getUser(searchParams.get('user'))
        }else if(onlyAdmins){
            getAdmins()
        }else {
            getUsers(pageNumber + 1, pageSize, "", "", "")
        }
    }, [searchParams, pageNumber, pageSize, onlyAdmins])

    useEffect(() => {
        return () => setUsersData([])
    }, [])

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
                isOpenView={isOpenView}
                handleOpenView={handleOpenView}
                currentUser={currentUser}
                updateUser={updateUser}
                onlyAdmins={onlyAdmins}
                handleOnlyAdmins={handleOnlyAdmins}
                admin={admin}
                isOpenAddAdmin={isOpenAddAdmin}
                handleOpenAddAdmin={handleOpenAddAdmin}
                addAdmin={handleAddAdmin}
                removeAdmin={handleDeleteAdmin}
                isOpenRemove={isOpenRemove}
                handleRemove={handleRemove}
                serverError={serverError}
                serverResponse={serverResponse}
            />
        </AdminLayout>
    )
}

let mapStateToProps = (state) => ({
    isFetching: state.common.isFetching,
    users: state.user.users,
    total: state.user.total,
    newUser: state.user.newUser,
    admin: state.user.user,
    serverError: state.common.serverError,
    serverResponse: state.common.serverResponse
})

export default connect(mapStateToProps, {
    getUsers,
    updateSomeUser,
    setNewUser,
    setUsersData,
    getAdmins,
    getUser,
    addAdmin,
    removeAdmin
})(AdminUsersContainer)