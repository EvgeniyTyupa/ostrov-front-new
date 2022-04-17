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
        handlePageSize
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
            key: "last",
            text: "",
            searchByValue: ""
        }
    ]

    return (
        <div className={classes.main}>
            {(serverResponse || serverError) && <ServerResponse/>}
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
                                    {/* <TableCell>
                                        <CustomCheckbox checked={item.is_hg} 
                                            disabled={(!item.is_hg && totalIsHg === 5)}
                                            onChange={
                                                () => editTag(item._id, { is_hg: !item.is_hg })
                                            }
                                        />
                                    </TableCell> */}
                                    <TableCell width={120}>
                                        <AdminControllButtons 
                                            item={item} 
                                            onView={() => console.log('asd')}
                                            type="view"
                                        />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                {users.length === 0 && <EmptyData/>}
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
        </div>
    )
}

export default AdminUsers