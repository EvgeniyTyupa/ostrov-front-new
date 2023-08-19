import React from 'react'
import { useNavigate } from 'react-router-dom'
import classes from './DropdownMenuOther.module.css'

const DropdownMenuOther = (props) => {
    const { item, type, currentLanguage } = props

    const navigate = useNavigate()

    const onClick = () => {
        navigate(`/catalog?pageNumber=1&pageSize=25&searchBy=${type}&from=desc&searchValue=${item._id}`)
    }

    return (
        <div className={classes.main} onClick={onClick}>
            {type === "brand" ?
                <p>{item.name}</p>
            :   
                <p>{currentLanguage === "ru" ? item.name : item.name_ua}</p>
            }
            
        </div>
    )
}

export default DropdownMenuOther