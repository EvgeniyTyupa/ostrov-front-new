import React, { useState } from 'react'
import classes from '../AdminView.module.css'
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@mui/material'
import AdminControllButtons from '../../UI/Admin/Table/ControlButtons/AdminControllButtons';
import AdminSearch from '../../UI/Admin/Table/Search/AdminSearch';
import AdminAddForm from './AdminAddForm';
import TableTh from '../../UI/Admin/Table/TableTh/TableTh';
import AdminDeleteModal from '../../UI/Admin/AdminDeleteModal/AdminDeleteModal'
import AdminEditForm from './AdminEditForm';
import ServerResponse from '../../UI/ServerResponse/ServerResponse';
import EmptyData from '../../UI/Admin/EmpyData/EmptyData';
import { priceParser } from '../../../Utils/priceParser';
import AnimatedBlock from '../../Animation/AnimatedBlock/AnimatedBlock';

const AdminItems = (props) => {
    const { 
        items, 
        total, 
        brands, 
        categories, 
        tags,
        pageSize,
        pageNumber,
        isOpenAddModal,
        handleAddModal,
        handleChangePage,
        handlePageSize,
        getItems,
        searchValue,
        setSearchValue,
        createItem,
        deleteItem,
        updateItem,
        serverResponse,
        serverError,
        openEdit,
        handleEdit,
        currentItem,
        openRemove,
        handleRemove,
    } = props

    const rows = [
        {
            key: "one",
            text: "",
            searchByValue: ""
        },
        {
            key: 'name',
            text: "Название",
            searchByValue: "name"
        },
        {
            key: 'code',
            text: "Код",
            searchByValue: "code"
        },
        {
            key: 'price',
            text: "Цена",
            searchByValue: "price"
        },
        {
            key: 'brand',
            text: "Бренд",
            searchByValue: "brand"
        },
        {
            key: 'category',
            text: "Категория",
            searchByValue: "category"
        },
        {
            key: 'count',
            text: "Наявность",
            searchByValue: "count"
        },
        {
            key: 'last',
            text: "",
            searchByValue: ""
        },
    ]

    return (
        <AnimatedBlock className={classes.main}>
            {(serverError || serverResponse) && <ServerResponse/> }
            {isOpenAddModal && 
                <AdminAddForm 
                    onClose={handleAddModal} 
                    brands={brands} 
                    categories={categories} 
                    tags={tags}
                    createItem={createItem}
                />
            }
            {openEdit && 
                <AdminEditForm
                    onClose={handleEdit}
                    onEdit={handleEdit}
                    brands={brands}
                    editItem={updateItem}
                    categories={categories}
                    tags={tags}
                    item={currentItem}
                />
            }
            {openRemove && 
                <AdminDeleteModal 
                    onRemove={handleRemove} 
                    item={currentItem} 
                    deleteItem={deleteItem}
                    onClose={handleRemove}
                />
            }
            <div className={classes.header}>
                <h2>Товары</h2>
                <div className={classes.topController}>
                    <AdminSearch onSearch={getItems} pageSize={pageSize} setSearchValue={setSearchValue} searchValue={searchValue}/>
                    <Button onClick={handleAddModal} className={classes.addBut}>Добавить +</Button>
                </div>
            </div>
            <div className={classes.table}>
                <TableContainer component={Paper} className={classes.tableContainer}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                {rows.map(item => <TableTh text={item.text} onSort={getItems} searchByValue={item.searchByValue} searchValue={searchValue} pageNumber={pageNumber} pageSize={pageSize} key={item.key}/>)}
                            </TableRow>
                        </TableHead>
                        <TableBody >
                            {items.map(item => (
                                <TableRow key={item._id}>
                                    <TableCell width={70}>
                                        <img src={item.images[0]} alt="image" className={classes.imgPreview}/>
                                    </TableCell>
                                    <TableCell width={"12%"}>{item.name}</TableCell>
                                    <TableCell align='center'>{item.code}</TableCell>
                                    <TableCell>{priceParser(item.price)} грн.</TableCell>
                                    <TableCell>{item.brand && item.brand.name}</TableCell>
                                    <TableCell>{item.category && item.category.name}</TableCell>
                                    <TableCell align='center'>{item.count > 0 ? (item.count + " шт.") : "Нет в наличии"}</TableCell>
                                    <TableCell width={90} align="right">
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
                {items.length === 0 && <EmptyData/>}
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
        </AnimatedBlock>
    )
}

export default AdminItems