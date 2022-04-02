import { IconButton } from '@mui/material'
import React, { useEffect, useState } from 'react'
import classes from './Pagination.module.css'
import { FiArrowRight, FiArrowLeft } from 'react-icons/fi';
import Pagination from '@mui/material/Pagination';
import { makeStyles } from '@mui/styles'

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
    const { currentPage, total, pageSize, setCurrentPage } = props

    const [count, setCount] = useState(Math.ceil(total / pageSize))

    const material = useStyles()

    useEffect(() => {
        setCount(Math.ceil(total / pageSize))
    }, [pageSize, total])

    return (
        <div className={classes.main}>
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