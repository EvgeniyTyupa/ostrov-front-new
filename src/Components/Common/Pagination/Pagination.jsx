import { IconButton, MenuItem } from '@mui/material'
import React, { useEffect, useState } from 'react'
import classes from './Pagination.module.css'
import { FiArrowRight, FiArrowLeft } from 'react-icons/fi';
import Pagination from '@mui/material/Pagination';
import { makeStyles } from '@mui/styles'
import CustomSelect from '../../UI/Form/Select';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles((theme) => ({
    root:{
        '& .MuiPaginationItem-root': {
            fontFamily: "Montserrat",
            color: "#4B5EA3"
        },
        '& .MuiPaginationItem-root.Mui-selected': {
            backgroundColor: "#4B5EA3",
            color: "white",
            fontWeight: "700"
        },
        "& .MuiPaginationItem-root.Mui-selected:hover": {
            backgroundColor: "#42528d"
        }
    }
}));

const CustomPagination = (props) => {
    const { 
        currentPage, 
        total, 
        pageSize, 
        setCurrentPage,
        setPageSize
    } = props

    const [count, setCount] = useState(Math.ceil(total / pageSize))

    const material = useStyles()

    const { t } = useTranslation()

    useEffect(() => {
        let newCount = Math.ceil(total / pageSize)
        if(newCount === 0) {
            newCount = 1
        }
        setCount(newCount)
    }, [pageSize, total])

    return (
        <div className={classes.main}>
            <div className={classes.pageSize}>
                <label>{t("catalog.pageSize")}:</label>
                <CustomSelect variant="standard" onChange={setPageSize} value={pageSize}>
                    <MenuItem value={1}>10</MenuItem>
                    <MenuItem value={25}>25</MenuItem>
                    <MenuItem value={50}>50</MenuItem>
                    <MenuItem value={100}>100</MenuItem>
                </CustomSelect>
            </div>
            <Pagination 
                page={currentPage}
                count={count} 
                classes={material} 
                size={"large"}
                onChange={(e, page) => setCurrentPage(page)}
            />
        </div>
    )
}

export default CustomPagination