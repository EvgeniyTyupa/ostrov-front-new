import React from 'react'
import classes from '../AdminView.module.css'
import EmptyData from '../../UI/Admin/EmpyData/EmptyData';
import TableTh from '../../UI/Admin/Table/TableTh/TableTh';
import AdminSearch from '../../UI/Admin/Table/Search/AdminSearch'
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@mui/material'
import AdminControllButtons from '../../UI/Admin/Table/ControlButtons/AdminControllButtons';
import ServerResponse from '../../UI/ServerResponse/ServerResponse';

const AdminActions = (props) => {
    const {
        getActions,
        setSearchValue,
        searchValue,
        handleAddModal,
        actions,
        pageSize,
        pageNumber,
        handleChangePage,
        handlePageSize,
        handleRemove,
        handleEdit,
        total,
    } = props

    const rows = [
        {
            key: "title",
            text: "Заголовок",
            searchByValue: "title"
        },
        {
            key: "start",
            text: "Старт",
            searchByValue: "start"
        },
        {
            key: "end",
            text: "Конец",
            searchByValue: "end"
        },
        {
            key: 'last',
            text: "",
            searchByValue: ""
        }
    ]

    return (
        <div className={classes.main}>
            <div className={classes.header}>
                <h2>Акции</h2>
                <div className={classes.topController}>
                    <AdminSearch onSearch={getActions} pageSize={pageSize} setSearchValue={setSearchValue} searchValue={searchValue}/>
                    <Button onClick={handleAddModal} className={classes.addBut}>Добавить +</Button>
                </div>
            </div>
            <div className={classes.table}>
                <TableContainer component={Paper} className={classes.tableContainer}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                {rows.map(item => <TableTh text={item.text} onSort={getActions} searchByValue={item.searchByValue} searchValue={searchValue} pageNumber={pageNumber} pageSize={pageSize} key={item.key}/>)}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            
                        </TableBody>
                    </Table>
                </TableContainer>
                {actions.length === 0 && <EmptyData/>}
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

export default AdminActions