import React from 'react'
import classes from '../AdminView.module.css'
import EmptyData from '../../UI/Admin/EmpyData/EmptyData';
import ServerResponse from '../../UI/ServerResponse/ServerResponse';
import AdminControllButtons from '../../UI/Admin/Table/ControlButtons/AdminControllButtons';
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@mui/material'
import TableTh from '../../UI/Admin/Table/TableTh/TableTh';
import AdminSearch from '../../UI/Admin/Table/Search/AdminSearch'
import { priceParser } from '../../../Utils/priceParser';
import OrderStatusLabel from './StatusLabel/OrderStatusLabel';
import { GiCheckMark } from 'react-icons/gi';
import { FcCancel } from 'react-icons/fc';
import moment from 'moment'
import AdminOrderInfo from './AdminOrderInfo';

const AdminOrders = (props) => {
    const {
        serverError,
        serverResponse,
        getOrders,
        pageSize,
        pageNumber,
        setSearchValue,
        searchValue,
        orders,
        handleOpenView,
        isOpenView,
        currentOrder,
        handleChangePage,
        handlePageSize,
        total,
        updateOrder
    } = props

    const rows = [
        {
            key: 'number',
            text: "Номер",
            searchByValue: "number"
        },
        {
            key: 'user',
            text: "Клиент",
            searchByValue: "first_name"
        },
        {
            key: 'total',
            text: "Чек",
            searchByValue: "total"
        },
        {
            key: 'status',
            text: "Статус",
            searchByValue: "status"
        },
        {
            key: 'approved',
            text: "Подтвержден",
            searchByValue: "approved"
        },
        {
            key: 'created_at',
            text: "Время заказа",
            searchByValue: "created_at"
        },
        {
            key: 'action',
            text: "",
            searchByValue: ""
        },
    ]

    return (
        <div className={classes.main}>
            {(serverResponse || serverError) && <ServerResponse/>}
            {isOpenView &&
                <AdminOrderInfo
                    onClose={handleOpenView}
                    order={currentOrder}
                    updateOrder={updateOrder}
                />
            }
            <div className={classes.header}>
                <h2>Заказы</h2>
                <div className={classes.topController}>
                    <AdminSearch onSearch={getOrders} pageSize={pageSize} setSearchValue={setSearchValue} searchValue={searchValue}/>
                </div>
            </div>
            <div className={classes.table}>
                <TableContainer component={Paper} className={classes.tableContainer}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                {rows.map(item => (
                                    <TableTh 
                                        text={item.text} 
                                        onSort={getOrders} 
                                        searchByValue={item.searchByValue} 
                                        searchValue={searchValue} 
                                        pageNumber={pageNumber} 
                                        pageSize={pageSize} 
                                        key={item.key}
                                        align={
                                            item.key === 'approved' ? "center" : "left"
                                        }
                                    />
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {orders.map(item => (
                                <TableRow key={item._id}>
                                    <TableCell align='center' width="75px" style={{ fontWeight: "700" }}>{item.number}</TableCell>
                                    <TableCell>
                                        <div className={classes.infoCell}>
                                            <span>{item.receiver_info.first_name} {item.receiver_info.last_name}</span>
                                            {item.receiver_info.email && <span>{item.receiver_info.email}</span>}
                                            <span>{item.receiver_info.phone}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell>{priceParser(item.total)} грн.</TableCell>
                                    <TableCell>
                                        <OrderStatusLabel status={item.status}/>
                                    </TableCell>
                                    <TableCell align='center' style={{ fontSize: "22px" }}>
                                        {item.approved ?
                                            <GiCheckMark color='green'/> :
                                            <FcCancel/>
                                        }
                                    </TableCell>
                                    <TableCell>
                                        {moment(item.created_at).format("DD/MM/YYYY hh:mm:ss")}
                                    </TableCell>
                                    <TableCell width={60}>
                                        <AdminControllButtons 
                                            item={item} 
                                            onView={handleOpenView}
                                            type="view"
                                        />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                {orders.length === 0 && <EmptyData/>}
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

export default AdminOrders