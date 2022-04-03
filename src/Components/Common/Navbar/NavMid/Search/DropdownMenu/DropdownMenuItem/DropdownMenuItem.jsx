import React from 'react'
import { useNavigate } from 'react-router-dom'
import classes from './DropdownMenuItem.module.css'

const DropdownMenuItem = (props) => {
    const { item, currentLanguage } = props

    const navigate = useNavigate()

    const onClick = () => {
        let itemName = currentLanguage === "ru" ? item.name : item.name_ua

        navigate(`/item/${itemName}`)
    }

    return (
        <div className={classes.main} onClick={onClick}>
            <img src={item.images[0]} alt={item.name} className={classes.img}/>
            <div className={classes.info}>
                <p className={classes.name}>{currentLanguage === "ru" ? item.name : item.name_ua}</p>
            </div>
        </div>
    )
}

export default DropdownMenuItem