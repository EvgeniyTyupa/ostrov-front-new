import React from 'react'
import classes from '../AdminView.module.css'
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@mui/material'
import AdminSearch from '../../UI/Admin/Table/Search/AdminSearch';
import ServerResponse from '../../UI/ServerResponse/ServerResponse';
import TableTh from '../../UI/Admin/Table/TableTh/TableTh';
import AdminAddNews from './AdminAddNews';
import EmptyData from '../../UI/Admin/EmpyData/EmptyData';
import AdminEditNews from './AdminEditNews';
import AdminControllButtons from '../../UI/Admin/Table/ControlButtons/AdminControllButtons';
import moment from 'moment'
import AdminDeleteModal from '../../UI/Admin/AdminDeleteModal/AdminDeleteModal';

const AdminNews = (props) => {
    const {
        getNews,
        pageSize,
        setSearchValue,
        searchValue,
        handleAddModal,
        isOpenAddModal,
        handleEdit,
        handleRemove,
        openEdit,
        openRemove,
        pageNumber,
        news,
        total,
        handleChangePage,
        handlePageSize,
        currentItem,
        handleAddPost,
        deleteNews
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
            {isOpenAddModal &&
                <AdminAddNews
                    onClose={handleAddModal}
                    createNews={handleAddPost}
                />
            }
            {openEdit && 
                <AdminEditNews
                    onClose={handleEdit}
                    item={currentItem}
                />
            }
            {openRemove && 
                <AdminDeleteModal
                    onRemove={handleRemove}
                    item={currentItem}
                    deleteItem={deleteNews}
                    onClose={handleRemove}
                />
            }
            <div className={classes.header}>
                <h2>Новости</h2>
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
                        <TableBody>
                            {news.map(item => (
                                <TableRow key={item._id}>
                                    <TableCell width={150}>
                                        <img src={item.images[0]} alt="image" className={classes.imgPreview}/>
                                    </TableCell>
                                    <TableCell>{item.title}</TableCell>
                                    <TableCell width={"20%"}>{moment(item.createdAt).format('DD/MM/YYYY')}</TableCell>
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
                {news.length === 0 && <EmptyData/>}
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

export default AdminNews