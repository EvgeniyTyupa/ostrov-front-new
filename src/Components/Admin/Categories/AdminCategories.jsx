import React from 'react'
import AdminSearch from '../../UI/Admin/Table/Search/AdminSearch'
import classes from '../AdminView.module.css'
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@mui/material'
import TableTh from '../../UI/Admin/Table/TableTh/TableTh';
import AdminControllButtons from '../../UI/Admin/Table/ControlButtons/AdminControllButtons';
import ServerResponse from '../../UI/ServerResponse/ServerResponse';
import AdminDeleteModal from '../../UI/Admin/AdminDeleteModal/AdminDeleteModal';
import AdminAddCategory from './AdminAddCategory';
import AdminEditCategory from './AdminEditCategory';
import EmptyData from '../../UI/Admin/EmpyData/EmptyData';
import AnimatedBlock from '../../Animation/AnimatedBlock/AnimatedBlock';

const AdminCategories = (props) => {
    const {
        categories,
        getAllCategories,
        pageSize,
        pageNumber,
        handleEdit,
        handleRemove,
        setSearchValue,
        handleAddModal,
        searchValue,
        handleChangePage,
        handlePageSize,
        total,
        currentItem,
        serverError,
        serverResponse,
        addCategory,
        editCategory,
        deleteCategory,
        isOpenAddModal,
        openEdit,
        openRemove,
        getAllCategoriesForSelect,
        allCategories
    } = props

    const rows = [
        {
            key: 'name',
            text: 'Название',
            searchByValue: "name"
        },
        {
            key: 'last',
            text: "",
            searchByValue: ""
        },
    ]

    return (
        <AnimatedBlock className={classes.main}>
            {(serverResponse || serverError) && <ServerResponse/>}
            {isOpenAddModal && 
                <AdminAddCategory
                    onClose={handleAddModal}
                    addCategory={addCategory}
                    getAllCategoriesForSelect={getAllCategoriesForSelect}
                    allCategories={allCategories}
                />
            }
            {openEdit && 
                <AdminEditCategory
                    onClose={handleEdit}
                    item={currentItem}
                    editCategory={editCategory}
                    onEdit={handleEdit}
                    getAllCategoriesForSelect={getAllCategoriesForSelect}
                    allCategories={allCategories}
                />
            }
            {openRemove && 
                <AdminDeleteModal
                    onRemove={handleRemove}
                    item={currentItem}
                    deleteItem={deleteCategory}
                    onClose={handleRemove}
                />
            }
            <div className={classes.header}>
                <h2>Категории</h2>
                <div className={classes.topController}>
                    <AdminSearch onSearch={getAllCategories} pageSize={pageSize} setSearchValue={setSearchValue} searchValue={searchValue}/>
                    <Button onClick={handleAddModal} className={classes.addBut}>Добавить +</Button>
                </div>
            </div>
            <div className={classes.table}>
                <TableContainer component={Paper} className={classes.tableContainer}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                {rows.map(item => <TableTh text={item.text} onSort={getAllCategories} searchByValue={item.searchByValue} searchValue={searchValue} pageNumber={pageNumber} pageSize={pageSize} key={item.key}/>)}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {categories.map(item => (
                                <TableRow key={item._id}>
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
                {categories.length === 0 && <EmptyData/>}
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

export default AdminCategories