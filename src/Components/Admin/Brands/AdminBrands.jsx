import React from 'react'
import AdminSearch from '../../UI/Admin/Table/Search/AdminSearch'
import classes from '../AdminView.module.css'
import TableTh from '../../UI/Admin/Table/TableTh/TableTh';
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@mui/material'
import AdminControllButtons from '../../UI/Admin/Table/ControlButtons/AdminControllButtons';

const AdminBrands = (props) => {
    const { 
        brands,
        pageSize,
        pageNumber,
        handleChangePage,
        handlePageSize,
        getBrands,
        searchValue,
        setSearchValue,
        isOpenAddModal,
        handleAddModal,
        handleRemove,
        handleEdit,
        total,
        currentItem,
    } = props

    const rows = [
        {
            key: 'image',
            text: "Изображение",
            searchByValue: ""
        },
        {
            key: 'name',
            text: "Название",
            searchByValue: "name"
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
                <h2>Бренды</h2>
                <div className={classes.topController}>
                    <AdminSearch onSearch={getBrands} pageSize={pageSize} setSearchValue={setSearchValue} searchValue={searchValue}/>
                    <Button onClick={handleAddModal} className={classes.addBut}>Добавить +</Button>
                </div>
            </div>
            <div className={classes.table}>
                <TableContainer component={Paper} className={classes.tableContainer}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                {rows.map(item => <TableTh text={item.text} onSort={getBrands} searchByValue={item.searchByValue} searchValue={searchValue} pageNumber={pageNumber} pageSize={pageSize} key={item.key}/>)}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {brands.map(item => (
                                <TableRow key={item._id}>
                                    <TableCell>
                                        <img src={item.image} alt="image" className={classes.imgPreview}/>
                                    </TableCell>
                                    <TableCell>{item.name}</TableCell>
                                    <TableCell width={120}>
                                        <AdminControllButtons
                                            item={item}
                                            onRemove={handleRemove}
                                            onEdit={handleEdit}
                                        />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
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

export default AdminBrands