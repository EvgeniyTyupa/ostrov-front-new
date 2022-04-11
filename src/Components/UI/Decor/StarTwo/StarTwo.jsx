import React from 'react'
import { useLocation } from 'react-router-dom'
import classes from './StarTwo.module.css'
import star2 from '../../../../Assets/star2.svg'

const StarTwo = (props) => {
    const { pathname } = useLocation()

    return (
        <>
            {(!pathname.includes("admin") && !pathname.includes("/sign_up")) &&
            <img src={star2} alt="star" className={classes.main}/>}
        </>
    )
}

export default StarTwo