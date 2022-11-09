import React from 'react'
import { useNavigate } from 'react-router-dom'
import useWindowDimensions from '../../../Hooks/useWindowDimension'
import classes from './MainSlide.module.css'

const MainSlide = (props) => {
    const { item, currentLanguage } = props
    
    const navigate = useNavigate()

    const { width } = useWindowDimensions()

    const onClick = () => {
        if(item.image) {
            navigate(`/actions/${currentLanguage === "ru" ? item.title : item.title_ua}`)
        }else {
            navigate(`/blog/${currentLanguage === "ru" ? item.title : item.title_ua}`)
        }
    }

    return(
        <img 
            src={item.image ? (width <= 568 ? item.image_mobile : item.image) : (item.title_image ? item.title_image : item.images[0])} 
            alt="title img"
            className={classes.main}
            onClick={onClick}
            referrerpolicy="no-referrer"
        />
    )
}

export default MainSlide