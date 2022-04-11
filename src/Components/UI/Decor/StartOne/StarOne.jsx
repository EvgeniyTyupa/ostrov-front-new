import React from 'react'
import { useLocation } from 'react-router-dom'
import classes from './StarOne.module.css'
import star1 from '../../../../Assets/star1.svg'

const StarOne = (props) => {
    const { pathname } = useLocation()

    return (
        <>
            {(!pathname.includes("admin") && !pathname.includes("/sign_up")) &&
            <img src={star1} alt="star" className={classes.main}/>}
        </>
    )
}

export default StarOne