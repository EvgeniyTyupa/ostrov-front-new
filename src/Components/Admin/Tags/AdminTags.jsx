import React from 'react'
import classes from '../AdminView.module.css'
import AdminSearch from '../../UI/Admin/Table/Search/AdminSearch'
import { Button, Checkbox, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@mui/material'
import TableTh from '../../UI/Admin/Table/TableTh/TableTh';
import AdminControllButtons from '../../UI/Admin/Table/ControlButtons/AdminControllButtons';
import AdminAddTag from './AdminAddTag';
import ServerResponse from '../../UI/ServerResponse/ServerResponse';

const AdminTags = (props) => {
    const {
        tags,
        getTags,
        addTag,
        editTag,
        deleteTag,
        pageSize,
        pageNumber,
        handleChangePage,
        handlePageSize,
        searchValue,
        setSearchValue,
        isOpenAddModal,
        handleAddModal,
        openEdit,
        openRemove,
        handleRemove,
        handleEdit,
        serverError,
        serverResponse
    } = props

    const rows = [
        {
            key: 'name',
            text: "Название",
            searchByValue: "name"
        },
        {
            key: 'is_hg',
            text: "Выделенный на главной",
            searchByValue: "is_hg"
        },
        {
            key: 'last',
            text: "",
            searchByValue: ""
        },
    ]

    return (
        <div className={classes.main}>
            {(serverResponse || serverError) && <ServerResponse/>}
            {isOpenAddModal && 
                <AdminAddTag
                    onClose={handleAddModal}
                    addTag={addTag}
                />
            }
            <div className={classes.header}>
                <h2>Теги</h2>
                <div className={classes.topController}>
                    <AdminSearch onSearch={getTags} pageSize={pageSize} setSearchValue={setSearchValue} searchValue={searchValue}/>
                    <Button onClick={handleAddModal} className={classes.addBut}>Добавить +</Button>
                </div>
            </div>
            <div className={classes.table}>
                <TableContainer component={Paper} className={classes.tableContainer}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                {rows.map(item => <TableTh text={item.text} onSort={getTags} searchByValue={item.searchByValue} searchValue={searchValue} pageNumber={pageNumber} pageSize={pageSize} key={item.key}/>)}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {tags.map(item => (
                                <TableRow key={item._id}>
                                    <TableCell width="50%">{item.name}</TableCell>
                                    <TableCell>
                                        <Checkbox value={item.is_hg}/>
                                    </TableCell>
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
            </div>
        </div>
    )
}

export default AdminTags