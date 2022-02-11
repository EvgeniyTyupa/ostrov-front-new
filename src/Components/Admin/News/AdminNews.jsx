import React from 'react'
import classes from '../AdminView.module.css'
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@mui/material'
import AdminSearch from '../../UI/Admin/Table/Search/AdminSearch';
import ServerResponse from '../../UI/ServerResponse/ServerResponse';
import TableTh from '../../UI/Admin/Table/TableTh/TableTh';

const AdminNews = (props) => {
    const {
        getNews,
        pageSize,
        setSearchValue,
        searchValue,
        handleAddModal,
        pageNumber
    } = props

    const rows = [
        {
            key: 'name',
            text: "Название",
            searchByValue: "title"
        },
        {
            key: 'date',
            text: "Дата публикации",
            searchByValue: "created_at"
        },
        {
            key: 'last',
            text: "",
            searchByValue: ""
        },
    ]

    return (
        <div className={classes.main}>
            <div className={classes.header}>
                <h2>Товары</h2>
                <div className={classes.topController}>
                    <AdminSearch onSearch={getNews} pageSize={pageSize} setSearchValue={setSearchValue} searchValue={searchValue}/>
                    <Button onClick={handleAddModal} className={classes.addBut}>Добавить +</Button>
                </div>
            </div>
            <div className={classes.table}>
                <TableContainer component={Paper} className={classes.tableContainer}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                {rows.map(item => <TableTh text={item.text} onSort={getNews} searchByValue={item.searchByValue} searchValue={searchValue} pageNumber={pageNumber} pageSize={pageSize} key={item.key}/>)}
                            </TableRow>
                        </TableHead>
                    </Table>
                </TableContainer>
            </div>
        </div>
    )
}

export default AdminNews