import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableSortLabel, TableBody, IconButton, TablePagination } from '@mui/material'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { NavLink } from 'react-router-dom'
import { priceParser } from '../../../Utils/priceParser'
import OrderStatusLabel from '../../Admin/Orders/StatusLabel/OrderStatusLabel'
import ProfileLayout from '../../UI/ProfileLayout/ProfileLayout'
import classes from './MyOrders.module.css'
import moment from 'moment'
import { AiFillEye } from 'react-icons/ai';
import MyOrderInfo from './MyOrderInfo'
import AnimatedBlock from '../../Animation/AnimatedBlock/AnimatedBlock'

const MyOrders = (props) => {
    const { 
        user, 
        orders, 
        onRequestSort,
        orderBy,
        order,
        pageNumber,
        pageSize,
        handleChangePage,
        handlePageSize,
        total,
        isOpenViewInfo,
        handleView,
        currentOrder
    } = props

    const { t } = useTranslation()

    const rows = [
        {
            key: 'number',
            text: "Номер",
            searchByValue: "number"
        },
        {
            key: 'finaly_sum',
            text: "Чек",
            searchByValue: "finaly_sum"
        },
        {
            key: 'status',
            text: "Статус",
            searchByValue: "status"
        },
        {
            key: 'created_at',
            text: t("profile.orders.table.time"),
            searchByValue: "created_at"
        },
        {
            key: 'action',
            text: "",
            searchByValue: ""
        },
    ]

    return (
        <>
            {isOpenViewInfo && <MyOrderInfo onClose={handleView} order={currentOrder}/>}
            <ProfileLayout title={t("profile.menu.orders")}>
                <AnimatedBlock className={classes.main}>
                    <div className={classes.table}>
                        {orders.length > 0 &&
                            <div className={classes.container}>
                                <h4>Общая сумма: {priceParser(user.money_spend)} грн.</h4>
                                <Paper className={classes.paper}>
                                    <TableContainer>
                                        <Table>
                                            <TableHead>
                                                <TableRow>
                                                    {rows.map((item, index) => (
                                                        <TableCell
                                                            align={(index === 0 || index === 1) ? "center" : "left"}
                                                            key={item.key}
                                                            sortDirection={orderBy === item.searchByValue ? order : false}
                                                        >
                                                            <TableSortLabel
                                                                active={orderBy === item.searchByValue}
                                                                direction={orderBy === item.searchByValue ? order : 'asc'}
                                                                onClick={onRequestSort(item.searchByValue)}
                                                            >
                                                                {item.text}
                                                            </TableSortLabel>
                                                        </TableCell>
                                                    ))}
                                                </TableRow>
                                            </TableHead>
                                            <TableBody className={classes.tbody}>
                                                {orders.map(item => (
                                                    <TableRow key={item._id}>
                                                        <TableCell width={"5%"} style={{ fontWeight: 700 }} align='center'>{item.number}</TableCell>
                                                        <TableCell align="center" width={120}>{priceParser(item.finaly_sum)} грн.</TableCell>
                                                        <TableCell width={"20%"}>
                                                            <OrderStatusLabel status={item.status}/>
                                                        </TableCell>
                                                        <TableCell width={"20%"}>
                                                            {moment(item.created_at).format("DD/MM/YYYY hh:mm:ss")}
                                                        </TableCell>
                                                        <TableCell width={50} align="center">
                                                            <IconButton 
                                                                className={classes.viewBut}
                                                                onClick={() => handleView(item)}
                                                            >
                                                                <AiFillEye/>
                                                            </IconButton>
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
                                </Paper>
                            </div>
                        }
                        {orders.length === 0 &&
                            <div className={classes.emptyBlock}>
                                <p className={classes.empty}>{t("profile.order_empty")}</p>
                                <NavLink to="/">{t("profile.order_empty_link")}</NavLink>
                            </div>
                        }
                    </div>
                </AnimatedBlock>
            </ProfileLayout>
        </>
    )
}

export default MyOrders