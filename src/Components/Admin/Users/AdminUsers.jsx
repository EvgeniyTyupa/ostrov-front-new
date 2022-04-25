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
import AdminAddAdmin from './AdminAddAdmin'
import AnimatedBlock from '../../Animation/AnimatedBlock/AnimatedBlock'

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
        handleOnlyAdmins,
        admin,
        isOpenAddAdmin,
        handleOpenAddAdmin,
        addAdmin,
        removeAdmin,
        isOpenRemove,
        handleRemove
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
        <AnimatedBlock className={classes.main}>
            {(serverResponse || serverError) && <ServerResponse/>}
            {isOpenView && 
                <AdminUserInfo
                    onClose={handleOpenView}
                    user={currentUser}
                    updateUser={updateUser}
                />
            }
            {isOpenAddAdmin &&
                <AdminAddAdmin
                    onClose={handleOpenAddAdmin}
                    addAdmin={addAdmin}
                />
            }
            {isOpenRemove &&
                <AdminDeleteModal
                    onRemove={handleRemove}
                    item={currentUser}
                    deleteItem={removeAdmin}
                    onClose={handleRemove}
                />
            }
            <div className={classes.header}>
                <h2>Пользователи</h2>
                <div className={classes.topController}>
                    <AdminSearch onSearch={getUsers} pageSize={pageSize} setSearchValue={setSearchValue} searchValue={searchValue}/>
                    {admin.adminLevel === 2 && <Button onClick={handleOpenAddAdmin} className={classes.addBut}>Добавить администратора</Button>}
                </div>
            </div>
            <div className={classes.table}>
                <TableContainer component={Paper} className={classes.tableContainer}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableTh text={rows[0].text} onSort={getUsers} searchByValue={rows[0].searchByValue} searchValue={searchValue} pageNumber={pageNumber} pageSize={pageSize}/>
                                <TableTh text={rows[1].text} onSort={getUsers} searchByValue={rows[1].searchByValue} searchValue={searchValue} pageNumber={pageNumber} pageSize={pageSize}/>
                                <TableTh text={rows[2].text} onSort={getUsers} searchByValue={rows[2].searchByValue} searchValue={searchValue} pageNumber={pageNumber} pageSize={pageSize}/>
                                {!onlyAdmins && <TableTh text={rows[3].text} onSort={getUsers} searchByValue={rows[3].searchByValue} searchValue={searchValue} pageNumber={pageNumber} pageSize={pageSize}/>}
                                <TableTh text={rows[4].text} onSort={getUsers} searchByValue={rows[4].searchByValue} searchValue={searchValue} pageNumber={pageNumber} pageSize={pageSize}/>                                
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {users.map(item => (
                                <TableRow key={item._id}>
                                    <TableCell>{(!item.first_name && !item.last_name) && "———————"} {item.first_name} {item.last_name}</TableCell>
                                    <TableCell>{item.email}</TableCell>
                                    <TableCell>{item.phone ? item.phone : "———————"}</TableCell>
                                    {!onlyAdmins && <TableCell>{item.money_spend ? priceParser(item.money_spend) : 0} грн.</TableCell>}
                                    <TableCell width={120}>
                                        <AdminControllButtons 
                                            item={item} 
                                            onView={handleOpenView}
                                            onRemove={handleRemove}
                                            type={(onlyAdmins && item._id != admin._id && admin.adminLevel > 1) ? "admin" : "view"}
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
                            label="Показать администраторов" 
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
        </AnimatedBlock>
    )
}

export default AdminUsers