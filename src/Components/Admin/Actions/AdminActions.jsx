import React from 'react'
import classes from '../AdminView.module.css'
import EmptyData from '../../UI/Admin/EmpyData/EmptyData';
import TableTh from '../../UI/Admin/Table/TableTh/TableTh';
import AdminSearch from '../../UI/Admin/Table/Search/AdminSearch'
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@mui/material'
import AdminControllButtons from '../../UI/Admin/Table/ControlButtons/AdminControllButtons';
import ServerResponse from '../../UI/ServerResponse/ServerResponse';
import moment from 'moment'
import CustomCheckbox from '../../UI/Form/Checkbox';
import AdminAddAction from './AdminAddAction';

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
        isActual,
        handleIsActual,
        isOpenAddModal,
        getItems,
        items,
        categories,
        brands,
        tags,
        getAllCategoriesForSelect,
        getBrands,
        getTags,
        serverError,
        serverResponse,
        addAction,
        editAction,
        deleteAction
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
            {(serverResponse || serverError) && <ServerResponse/>}
            {isOpenAddModal && 
                <AdminAddAction
                    onClose={handleAddModal}
                    getItems={getItems}
                    items={items}
                    categories={categories}
                    brands={brands}
                    tags={tags}
                    getCategories={getAllCategoriesForSelect}
                    getBrands={getBrands}
                    getTags={getTags}
                    addAction={addAction}
                />
            }
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
                            {actions.map(item => (
                                <TableRow key={item._id}>
                                    <TableCell>{item.title}</TableCell>
                                    <TableCell>{moment(item.start).format('DD/MM/YYYY')}</TableCell>
                                    <TableCell>{moment(item.end).format('DD/MM/YYYY')}</TableCell>
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
                {actions.length === 0 && <EmptyData/>}
                <div className={classes.footerContainer}>
                    <div className={classes.isActualContainer}>
                        <CustomCheckbox 
                            label="Показывать только актуальные" 
                            checked={isActual} 
                            onChange={handleIsActual}
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
            </div>
        </div>
    )
} 

export default AdminActions