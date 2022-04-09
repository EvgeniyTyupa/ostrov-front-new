import React from 'react'
import { useCountdown } from '../../../Hooks/useCountdown';
import classes from './DateCountdown.module.css'

const DateCountdown = (props) => {
    const { date, currentLanguage } = props

    const [days, hours, minutes, seconds] = useCountdown(date);

    return (
        <div className={classes.main}>
            <div className={classes.block}>
                <p>{days}д</p>
                {/* <span>д.</span> */}
            </div>
            <span>:</span>
            <div className={classes.block}>
                <p>{hours}{currentLanguage === "ru" ? "ч" : "г"}</p>
                {/* <span></span> */}
            </div>
            <span>:</span>
            <div className={classes.block}>
                <p>{minutes}{currentLanguage === "ru" ? "м" : "хв"}</p>
                {/* <span></span> */}
            </div>
            <span>:</span>
            <div className={classes.block}>
                <p>{seconds}с</p>
                {/* <span>сек.</span> */}
            </div>
        </div>
    )
}

export default DateCountdown