import React from 'react'
import { useTranslation } from 'react-i18next';
import { useCountdown } from '../../../Hooks/useCountdown';
import classes from './DateCountdown.module.css'

const DateCountdown = (props) => {
    const { date, currentLanguage } = props

    const [days, hours, minutes, seconds] = useCountdown(date);

    const { t } = useTranslation()

    return (
        <>
            {(days < 0 && hours < 0 && minutes < 0 && seconds < 0) ? <p className={classes.expired}>{t("expired")}</p> :
            <div className={classes.main}>
                <div className={classes.block}>
                    <p>{days}д</p>
                </div>
                <span>:</span>
                <div className={classes.block}>
                    <p>{hours}{currentLanguage === "ru" ? "ч" : "г"}</p>
                </div>
                <span>:</span>
                <div className={classes.block}>
                    <p>{minutes}{currentLanguage === "ru" ? "м" : "хв"}</p>
                </div>
                <span>:</span>
                <div className={classes.block}>
                    <p>{seconds}с</p>
                </div>
            </div>}
        </>
    )
}

export default DateCountdown