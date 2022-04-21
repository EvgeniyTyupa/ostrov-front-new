import React from 'react'
import classes from '../AdminView.module.css'
import AdminSearch from '../../UI/Admin/Table/Search/AdminSearch'
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@mui/material'
import TableTh from '../../UI/Admin/Table/TableTh/TableTh'
import AdminControllButtons from '../../UI/Admin/Table/ControlButtons/AdminControllButtons'
import ServerResponse from '../../UI/ServerResponse/ServerResponse'
import AdminDeleteModal from '../../UI/Admin/AdminDeleteModal/AdminDeleteModal'
import CustomCheckbox from '../../UI/Form/Checkbox'
import EmptyData from '../../UI/Admin/EmpyData/EmptyData'
import AdminUserInfo from './AdminUserInfo'
import { priceParser } from '../../../Utils/priceParser'
import { NavLink } from 'react-router-dom'

const AdminUsers = (props) => {
    const {
        serverResponse,
        serverError,
        getUsers,
        pageSize,
        pageNumber,
        setSearchValue,
        searchValue,
        users,
        total,
        handleChangePage,
        handlePageSize,
        isOpenView,
        handleOpenView,
        currentUser,
        updateUser,
        onlyAdmins,
        handleOnlyAdmins
    } = props

    const rows = [
        {
            key: 'name',
            text: "Имя",
            searchByValue: 'first_name'
        },
        {
            key: 'email',
            text: "Email",
            searchByValue: "email"
        },
        {
            key: "phone",
            text: "Телефон",
            searchByValue: "phone"
        },
        {
            key: "money_spend",
            text: "Потрачено",
            searchByValue: "money_spend"
        },
        {
            key: "last",
            text: "",
            searchByValue: ""
        }
    ]

    return (
        <div className={classes.main}>
            {(serverResponse || serverError) && <ServerResponse/>}
            {isOpenView && 
                <AdminUserInfo
                    onClose={handleOpenView}
                    user={currentUser}
                    updateUser={updateUser}
                />
            }
            <div className={classes.header}>
                <h2>Пользователи</h2>
                <div className={classes.topController}>
                    <AdminSearch onSearch={getUsers} pageSize={pageSize} setSearchValue={setSearchValue} searchValue={searchValue}/>
                    {/* <Button onClick={handleAddModal} className={classes.addBut}>Добавить +</Button> */}
                </div>
            </div>
            <div className={classes.table}>
                <TableContainer component={Paper} className={classes.tableContainer}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                {rows.map(item => <TableTh text={item.text} onSort={getUsers} searchByValue={item.searchByValue} searchValue={searchValue} pageNumber={pageNumber} pageSize={pageSize} key={item.key}/>)}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {users.map(item => (
                                <TableRow key={item._id}>
                                    <TableCell>{(!item.first_name && !item.last_name) && "———————"} {item.first_name} {item.last_name}</TableCell>
                                    <TableCell>{item.email}</TableCell>
                                    <TableCell>{item.phone ? item.phone : "———————"}</TableCell>
                                    <TableCell>{item.money_spend ? priceParser(item.money_spend) : 0} грн.</TableCell>
                                    <TableCell width={120}>
                                        <AdminControllButtons 
                                            item={item} 
                                            onView={handleOpenView}
                                            type="view"
                                        />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                {users.length === 0 && <EmptyData/>}
                <div className={classes.footerContainer}>
                    <div className={classes.isActualContainer}>
                        <CustomCheckbox 
                            label="Показывать администраторов" 
                            checked={onlyAdmins} 
                            onChange={handleOnlyAdmins}
                        />
                    </div>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 20, 50]}
                        component={"div"}
                        rowsPerPage={pageSize}
                        page={pageNumber}
                        count={total}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handlePageSize}
                    />
                </div>
                <NavLink to="/admin/users" className={classes.filter}>Сбросить фильтр</NavLink>
            </div>
        </div>
    )
}

export default AdminUsers