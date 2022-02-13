import React from 'react'
import classes from './PreviewImage.module.css'
import { AiOutlineClose } from 'react-icons/ai';
import { IconButton } from '@mui/material';

const PreviewImage = (props) => {
    const { 
        item, 
        onRemove, 
        dataImgIndex, 
        dragStartHandler, 
        dragEndHandler, 
        dragOverHandler, 
        dropHandler 
    } = props

    const handleRemove = () => {
        onRemove(dataImgIndex)
    }

    return (
        <div 
            className={classes.main} 
            draggable={true}
            onDragStart={(e) => dragStartHandler(e, item, dataImgIndex)}
            onDragLeave={(e) => dragEndHandler(e)}
            onDragEnd={(e) => dragEndHandler(e)}
            onDragOver={(e) => dragOverHandler(e)}
            onDrop={(e) => dropHandler(e, item, dataImgIndex)}
        >
            <img src={item.src} alt="image"/>
            <IconButton onClick={handleRemove}>
                <AiOutlineClose/>
            </IconButton>
        </div>
    )
}

export default PreviewImage