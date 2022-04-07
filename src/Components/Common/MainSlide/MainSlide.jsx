import React from 'react'
import { useNavigate } from 'react-router-dom'
import classes from './MainSlide.module.css'

const MainSlide = (props) => {
    const { item, currentLanguage } = props
    
    const navigate = useNavigate()

    const onClick = () => {
        if(item.image) {
            navigate(`/action/${currentLanguage === "ru" ? item.title : item.title_ua}`)
        }else {
            navigate(`/blog/${currentLanguage === "ru" ? item.title : item.title_ua}`)
        }
    }

    return(
        <img 
            src={item.image ? item.image : item.images[0]} 
            alt="title img"
            className={classes.main}
            onClick={onClick}
        />
    )
}

export default MainSlide