import React from 'react'
import classes from './EmptyData.module.css'
import { SiDatabricks } from 'react-icons/si';

const EmptyData = () => {
    return (
        <div className={classes.main}>
            <SiDatabricks/>
            <p>Нет данных</p>
        </div>
    )
}

export default EmptyData