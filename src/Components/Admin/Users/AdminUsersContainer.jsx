import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { useSearchParams } from 'react-router-dom'
import { getAdmins, getUser, getUsers, setNewUser, setUsersData, updateSomeUser } from '../../../Redux/userReducer'
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
        admin
    } = props

    const [pageSize, setPageSize] = useState(20)
    const [pageNumber, setPageNumber] = useState(0)

    const [searchValue, setSearchValue] = useState("")

    const [currentUser, setCurrentUser] = useState(null)

    const [isOpenView, setIsOpenView] = useState(false)

    const [onlyAdmins, setOnlyAdmins] = useState(false)

    const handleOnlyAdmins = () => {
        setOnlyAdmins(!onlyAdmins)
    }

    const [searchParams] = useSearchParams()

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
            />
        </AdminLayout>
    )
}

let mapStateToProps = (state) => ({
    isFetching: state.common.isFetching,
    users: state.user.users,
    total: state.user.total,
    newUser: state.user.newUser,
    admin: state.user.user
})

export default connect(mapStateToProps, {
    getUsers,
    updateSomeUser,
    setNewUser,
    setUsersData,
    getAdmins,
    getUser
})(AdminUsersContainer)