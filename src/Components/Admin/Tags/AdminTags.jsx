import React from 'react'
import classes from '../AdminView.module.css'
import AdminSearch from '../../UI/Admin/Table/Search/AdminSearch'
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@mui/material'
import TableTh from '../../UI/Admin/Table/TableTh/TableTh';
import AdminControllButtons from '../../UI/Admin/Table/ControlButtons/AdminControllButtons';
import AdminAddTag from './AdminAddTag';
import ServerResponse from '../../UI/ServerResponse/ServerResponse';
import AdminDeleteModal from '../../UI/Admin/AdminDeleteModal/AdminDeleteModal';
import AdminEditTag from './AdminEditTag';
import CustomCheckbox from '../../UI/Form/Checkbox';
import EmptyData from '../../UI/Admin/EmpyData/EmptyData';
import AnimatedBlock from '../../Animation/AnimatedBlock/AnimatedBlock';

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
        serverResponse,
        currentItem,
        total,
        totalIsHg
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
        <AnimatedBlock className={classes.main}>
            {(serverResponse || serverError) && <ServerResponse/>}
            {isOpenAddModal && 
                <AdminAddTag
                    onClose={handleAddModal}
                    addTag={addTag}
                />
            }
            {openEdit && 
                <AdminEditTag
                    onClose={handleEdit}
                    item={currentItem}
                    editTag={editTag}
                    onEdit={handleEdit}
                />
            }
            {openRemove && 
                <AdminDeleteModal
                    onRemove={handleRemove}
                    item={currentItem}
                    deleteItem={deleteTag}
                    onClose={handleRemove}
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
                                        <CustomCheckbox checked={item.is_hg} 
                                            disabled={(!item.is_hg && totalIsHg === 5)}
                                            onChange={
                                                () => editTag(item._id, { is_hg: !item.is_hg })
                                            }
                                        />
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
                {tags.length === 0 && <EmptyData/>}
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

export default AdminTags