import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { deletePromocode, getPromocodes, setPromocodesData, setTotalPromocodes, updatePromocode } from '../../../../Redux/promocodeReducer'
import AdminDeleteModal from '../../../UI/Admin/AdminDeleteModal/AdminDeleteModal'
import EmptyData from '../../../UI/Admin/EmpyData/EmptyData'
import AdminControllButtons from '../../../UI/Admin/Table/ControlButtons/AdminControllButtons'
import TableTh from '../../../UI/Admin/Table/TableTh/TableTh'
import CustomCheckbox from '../../../UI/Form/Checkbox'
import classes from '../../AdminView.module.css'
import AdminAddPromocode from './AdminAddPromocode'
import AdminEditPromocode from './AdminEditPromocode'

const rows = [
    {
        key: "name",
        text: "Имя",
        searchByValue: "name"
    },
    {
        key: "code",
        text: "Код",
        searchByValue: "code"
    },
    {
        key: "discount",
        text: "Скидка",
        searchByValue: "discount"
    },
    {
        key: "is_active",
        text: "Активен",
        searchByValue: "is_active"
    },
    {
        key: 'last',
        text: "",
        searchByValue: ""
    }
]

const AdminPromocodesTable = (props) => {
    const {
        promocodes,
        total,
        searchValue,
        getPromocodes,
        handleAddPromocodeModal,
        isOpenAddPromocode,
        pageNumber,
        pageSize,
        handlePageSize,
        handleChangePage,
        handleAddPromocode,
        deletePromocode,
        setPromocodesData,
        setTotalPromocodes,
        updatePromocode
    } = props

    const [openEdit, setOpenEdit] = useState(false)
    const [openRemove, setOpenRemove] = useState(false)

    const [currentItem, setCurrentItem] = useState(null)


    const handleEdit = (item) => {
        setCurrentItem(item)
        setOpenEdit(!openEdit)
    }

    const handleRemove = (item) => {
        setCurrentItem(item)
        setOpenRemove(!openRemove)
    }

    const handleDelete = (promocodeId) => {
        deletePromocode(promocodeId).then(() => {
            const newPromocodes = [...promocodes]
            newPromocodes.forEach((item, index) => {
                if(item._id == promocodeId) {
                    newPromocodes.splice(index, 1)
                }
            })
            setOpenRemove(false)
            setPromocodesData(newPromocodes)
            setTotalPromocodes(total - 1)
        })
    }

    return (
        <div className={classes.main}>
            {isOpenAddPromocode && (
                <AdminAddPromocode
                    onClose={handleAddPromocodeModal}
                    addPromocode={handleAddPromocode}
                />
            )}
            {openEdit && (
                <AdminEditPromocode
                    onClose={handleEdit}
                    promocode={currentItem}
                    editPromocode={updatePromocode}
                />
            )}
            {openRemove && (
                <AdminDeleteModal
                    onRemove={handleRemove}
                    item={currentItem}
                    deleteItem={handleDelete}
                    onClose={handleRemove}
                />
            )}
            <TableContainer component={Paper} className={classes.tableContainer}>
                <Table>
                    <TableHead>
                        <TableRow>
                            {rows.map(item => <TableTh text={item.text} onSort={getPromocodes} searchByValue={item.searchByValue} searchValue={searchValue} pageNumber={pageNumber} pageSize={pageSize} key={item.key}/>)}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {promocodes.map(item => (
                            <TableRow key={item._id}>
                                <TableCell>{item.name}</TableCell>
                                <TableCell>{item.code}</TableCell>
                                <TableCell>{item.discount.includes("%") ? item.discount : (item.discount + " грн.")}</TableCell>
                                <TableCell>
                                    <CustomCheckbox checked={item.is_active} 
                                        onChange={
                                            () => updatePromocode(item._id, { ...item, is_active: !item.is_active })
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
            {promocodes.length === 0 && <EmptyData/>}
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
    )
}

let mapStateToProps = (state) => ({
    promocodes: state.promocodes.promocodes,
    total: state.promocodes.total
})

export default connect(mapStateToProps, {
    getPromocodes,
    deletePromocode,
    setPromocodesData,
    setTotalPromocodes,
    updatePromocode
})(AdminPromocodesTable)