import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@mui/material'
import React from 'react'
import EmptyData from '../../UI/Admin/EmpyData/EmptyData'
import AdminControllButtons from '../../UI/Admin/Table/ControlButtons/AdminControllButtons'
import TableTh from '../../UI/Admin/Table/TableTh/TableTh'
import CustomCheckbox from '../../UI/Form/Checkbox'
import classes from '../AdminView.module.css'
import moment from 'moment'

const AdminActionsTable = (props) => {
    const {
        isActual,
        rows,
        getActions,
        searchValue,
        pageNumber,
        pageSize,
        actions,
        handleRemove,
        handleEdit,
        handleIsActual,
        handleChangePage,
        handlePageSize,
        total
    } = props

    return (
        <div className={classes.table}>
            <TableContainer component={Paper} className={classes.tableContainer}>
                <Table>
                    <TableHead>
                        <TableRow>
                            {rows.map(item => <TableTh filter={isActual} text={item.text} onSort={getActions} searchByValue={item.searchByValue} searchValue={searchValue} pageNumber={pageNumber} pageSize={pageSize} key={item.key}/>)}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {actions.map(item => (
                            <TableRow key={item._id}>
                                <TableCell>{item.title_ua}</TableCell>
                                <TableCell>{moment(item.start).format('DD/MM/YYYY')}</TableCell>
                                <TableCell>{moment(item.end).format('DD/MM/YYYY')}</TableCell>
                                <TableCell width={"15%"}>
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
    )
}

export default AdminActionsTable